-- =====================================================================
--  Tienda Clínica Dignidad — base de datos en Supabase
--  Ejecuta este archivo completo en Supabase → SQL Editor → New query.
--  Se puede ejecutar más de una vez sin romper nada.
-- =====================================================================

-- ---------------------------------------------------------------------
--  1. Administradores de la tienda
--  Solo los usuarios de esta tabla pueden editar productos y ver pedidos.
-- ---------------------------------------------------------------------
create table if not exists public.tienda_admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

alter table public.tienda_admins enable row level security;
-- Sin políticas: nadie la lee desde la web, solo la función de abajo.

create or replace function public.es_admin_tienda()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.tienda_admins where user_id = auth.uid()
  );
$$;

revoke all on function public.es_admin_tienda() from public;
grant execute on function public.es_admin_tienda() to anon, authenticated;

-- ---------------------------------------------------------------------
--  2. Productos
-- ---------------------------------------------------------------------
create table if not exists public.tienda_productos (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique
                  check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  nombre          text not null check (char_length(nombre) between 2 and 120),
  marca           text check (marca is null or char_length(marca) <= 60),
  descripcion     text check (descripcion is null or char_length(descripcion) <= 1000),
  categoria       text not null check (categoria in (
                    'cepillos', 'pastas', 'enjuagues', 'interdental',
                    'ortodoncia', 'ninos', 'protesis', 'kits'
                  )),
  precio          integer not null check (precio >= 0),
  precio_anterior integer check (precio_anterior is null or precio_anterior > precio),
  imagen_url      text,
  imagen_path     text,
  visible         boolean not null default true,
  agotado         boolean not null default false,
  destacado       boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists tienda_productos_categoria_idx
  on public.tienda_productos (categoria);

-- ---------------------------------------------------------------------
--  3. Pedidos
-- ---------------------------------------------------------------------
create table if not exists public.tienda_pedidos (
  id               uuid primary key default gen_random_uuid(),
  numero           bigint generated always as identity (start with 1001) unique,
  cliente_nombre   text not null,
  cliente_telefono text not null,
  cliente_email    text,
  metodo_pago      text not null check (metodo_pago in ('transferencia', 'pago_al_retirar')),
  nota             text,
  items            jsonb not null,
  total            integer not null check (total >= 0),
  estado           text not null default 'pendiente'
                   check (estado in ('pendiente', 'pagado', 'listo', 'entregado', 'cancelado')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists tienda_pedidos_created_at_idx
  on public.tienda_pedidos (created_at desc);
create index if not exists tienda_pedidos_telefono_idx
  on public.tienda_pedidos (cliente_telefono, created_at desc);

-- ---------------------------------------------------------------------
--  4. updated_at automático
-- ---------------------------------------------------------------------
create or replace function public.tienda_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists tienda_productos_updated_at on public.tienda_productos;
create trigger tienda_productos_updated_at
  before update on public.tienda_productos
  for each row execute function public.tienda_set_updated_at();

drop trigger if exists tienda_pedidos_updated_at on public.tienda_pedidos;
create trigger tienda_pedidos_updated_at
  before update on public.tienda_pedidos
  for each row execute function public.tienda_set_updated_at();

-- ---------------------------------------------------------------------
--  5. Seguridad (RLS)
-- ---------------------------------------------------------------------
alter table public.tienda_productos enable row level security;
alter table public.tienda_pedidos   enable row level security;

grant select on public.tienda_productos to anon, authenticated;
grant insert, update, delete on public.tienda_productos to authenticated;
grant select, update, delete on public.tienda_pedidos to authenticated;
revoke insert on public.tienda_pedidos from anon, authenticated;

-- Productos: cualquiera ve los visibles; los admins ven y editan todo.
drop policy if exists "productos visibles para todos" on public.tienda_productos;
create policy "productos visibles para todos"
  on public.tienda_productos for select
  to anon, authenticated
  using (visible or public.es_admin_tienda());

drop policy if exists "admins crean productos" on public.tienda_productos;
create policy "admins crean productos"
  on public.tienda_productos for insert
  to authenticated
  with check (public.es_admin_tienda());

drop policy if exists "admins editan productos" on public.tienda_productos;
create policy "admins editan productos"
  on public.tienda_productos for update
  to authenticated
  using (public.es_admin_tienda())
  with check (public.es_admin_tienda());

drop policy if exists "admins borran productos" on public.tienda_productos;
create policy "admins borran productos"
  on public.tienda_productos for delete
  to authenticated
  using (public.es_admin_tienda());

-- Pedidos: solo los admins los ven y cambian de estado.
-- Los clientes los crean únicamente con la función tienda_crear_pedido.
drop policy if exists "admins ven pedidos" on public.tienda_pedidos;
create policy "admins ven pedidos"
  on public.tienda_pedidos for select
  to authenticated
  using (public.es_admin_tienda());

drop policy if exists "admins editan pedidos" on public.tienda_pedidos;
create policy "admins editan pedidos"
  on public.tienda_pedidos for update
  to authenticated
  using (public.es_admin_tienda())
  with check (public.es_admin_tienda());

drop policy if exists "admins borran pedidos" on public.tienda_pedidos;
create policy "admins borran pedidos"
  on public.tienda_pedidos for delete
  to authenticated
  using (public.es_admin_tienda());

-- ---------------------------------------------------------------------
--  6. Crear pedido
--  Los precios y el total se calculan aquí, desde la tabla de productos.
--  Nunca se confía en el precio que manda el navegador.
-- ---------------------------------------------------------------------
create or replace function public.tienda_crear_pedido(
  p_nombre      text,
  p_telefono    text,
  p_email       text,
  p_metodo_pago text,
  p_nota        text,
  p_items       jsonb
)
returns table (numero_pedido bigint, total_pedido integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_nombre   text := btrim(coalesce(p_nombre, ''));
  v_telefono text := regexp_replace(coalesce(p_telefono, ''), '\D', '', 'g');
  v_email    text := nullif(btrim(coalesce(p_email, '')), '');
  v_nota     text := nullif(btrim(coalesce(p_nota, '')), '');
  v_items    jsonb := '[]'::jsonb;
  v_total    integer := 0;
  v_linea    record;
  v_prod     public.tienda_productos%rowtype;
begin
  if char_length(v_nombre) < 2 or char_length(v_nombre) > 80 then
    raise exception 'Escribe tu nombre (entre 2 y 80 letras).' using errcode = 'P0001';
  end if;

  if char_length(v_telefono) < 8 or char_length(v_telefono) > 12 then
    raise exception 'Revisa tu teléfono: debe tener entre 8 y 12 números.' using errcode = 'P0001';
  end if;

  if v_email is not null and (char_length(v_email) > 120 or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$') then
    raise exception 'Revisa tu correo electrónico.' using errcode = 'P0001';
  end if;

  if v_nota is not null and char_length(v_nota) > 500 then
    raise exception 'El comentario puede tener hasta 500 caracteres.' using errcode = 'P0001';
  end if;

  if p_metodo_pago is null or p_metodo_pago not in ('transferencia', 'pago_al_retirar') then
    raise exception 'Elige cómo vas a pagar.' using errcode = 'P0001';
  end if;

  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'Tu carrito está vacío.' using errcode = 'P0001';
  end if;

  if jsonb_array_length(p_items) > 40 then
    raise exception 'El pedido tiene demasiados productos distintos.' using errcode = 'P0001';
  end if;

  -- Freno simple contra pedidos repetidos o automáticos.
  if (
    select count(*) from public.tienda_pedidos
    where cliente_telefono = v_telefono
      and created_at > now() - interval '10 minutes'
  ) >= 5 then
    raise exception 'Ya recibimos varios pedidos desde este teléfono. Escríbenos por WhatsApp.' using errcode = 'P0001';
  end if;

  for v_linea in
    select (e ->> 'producto_id')::uuid as producto_id,
           sum((e ->> 'cantidad')::integer)::integer as cantidad
    from jsonb_array_elements(p_items) as e
    group by 1
  loop
    if v_linea.cantidad is null or v_linea.cantidad < 1 or v_linea.cantidad > 20 then
      raise exception 'Puedes llevar entre 1 y 20 unidades de cada producto.' using errcode = 'P0001';
    end if;

    select * into v_prod
    from public.tienda_productos
    where id = v_linea.producto_id and visible;

    if not found then
      raise exception 'Uno de los productos de tu carrito ya no está disponible. Quítalo e intenta de nuevo.' using errcode = 'P0001';
    end if;

    if v_prod.agotado then
      raise exception '"%" está agotado. Quítalo del carrito para continuar.', v_prod.nombre using errcode = 'P0001';
    end if;

    v_items := v_items || jsonb_build_array(jsonb_build_object(
      'producto_id', v_prod.id,
      'nombre',      v_prod.nombre,
      'marca',       v_prod.marca,
      'precio',      v_prod.precio,
      'cantidad',    v_linea.cantidad,
      'subtotal',    v_prod.precio * v_linea.cantidad
    ));
    v_total := v_total + v_prod.precio * v_linea.cantidad;
  end loop;

  insert into public.tienda_pedidos
    (cliente_nombre, cliente_telefono, cliente_email, metodo_pago, nota, items, total)
  values
    (v_nombre, v_telefono, v_email, p_metodo_pago, v_nota, v_items, v_total)
  returning numero, total into numero_pedido, total_pedido;

  return next;
end;
$$;

revoke all on function public.tienda_crear_pedido(text, text, text, text, text, jsonb) from public;
grant execute on function public.tienda_crear_pedido(text, text, text, text, text, jsonb) to anon, authenticated;

-- ---------------------------------------------------------------------
--  7. Fotos de productos (Storage)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('tienda', 'tienda', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Las fotos se ven por su URL pública; esta política solo sirve para que
-- el panel pueda reemplazar y borrar fotos.
drop policy if exists "tienda: admins ven fotos" on storage.objects;
create policy "tienda: admins ven fotos"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'tienda' and public.es_admin_tienda());

drop policy if exists "tienda: admins suben fotos" on storage.objects;
create policy "tienda: admins suben fotos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'tienda' and public.es_admin_tienda());

drop policy if exists "tienda: admins cambian fotos" on storage.objects;
create policy "tienda: admins cambian fotos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'tienda' and public.es_admin_tienda());

drop policy if exists "tienda: admins borran fotos" on storage.objects;
create policy "tienda: admins borran fotos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'tienda' and public.es_admin_tienda());

-- =====================================================================
--  ÚLTIMO PASO (una sola vez, después de crear tu usuario):
--  1. Supabase → Authentication → Users → Add user → con tu correo y clave.
--  2. Ejecuta esto con tu correo para darle acceso al panel:
--
--  insert into public.tienda_admins (user_id, email)
--  select id, email from auth.users where email = 'TU_CORREO@clinicadignidad.com'
--  on conflict (user_id) do nothing;
-- =====================================================================
