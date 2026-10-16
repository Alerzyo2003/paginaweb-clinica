# Tienda online de la clínica

- **`/tienda`**: catálogo con categorías, buscador, carrito y página de cada producto.
- **Pago**: por transferencia o al retirar en la clínica. No hay pasarela ni comisiones.
- **Pedidos**: quedan guardados con un número (N° 1001, 1002…) y el cliente avisa por WhatsApp.
- **`/admin`**: panel para crear, editar y ocultar productos con foto y precio, y para ver y atender pedidos.

## Puesta en marcha (una sola vez)

### 1. Crear las tablas en Supabase

En Supabase abre **SQL Editor → New query**, pega todo el contenido de [`supabase/tienda.sql`](supabase/tienda.sql) y presiona **Run**. Crea las tablas `tienda_productos`, `tienda_pedidos` y `tienda_admins`, la carpeta de fotos `tienda` y los permisos. Se puede ejecutar de nuevo sin romper nada.

Todo usa el prefijo `tienda_`, así que puede vivir en un proyecto de Supabase que ya uses.

### 2. Crear tu usuario de administrador

1. En Supabase ve a **Authentication → Users → Add user** y crea un usuario con tu correo y una contraseña (marca *Auto confirm*).
2. En el SQL Editor ejecuta esto con tu correo:

   ```sql
   insert into public.tienda_admins (user_id, email)
   select id, email from auth.users where email = 'TU_CORREO@clinicadignidad.com'
   on conflict (user_id) do nothing;
   ```

Repite el paso 2 con cada persona de recepción que deba usar el panel.

> Recomendado: en la configuración de Authentication, desactiva el registro libre de usuarios. Aunque alguien se registre no podría hacer nada (solo los de `tienda_admins` pueden editar), es mejor cerrarlo.

### 3. Conectar la web con Supabase

Las claves están en **Project Settings → API Keys** en Supabase. Usa la clave *publishable* (o la *anon*), **nunca** la *secret* / *service_role*.

En tu computador crea `.env.local` en la raíz del proyecto:

```
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

En **Vercel → tu proyecto → Settings → Environment Variables** agrega las mismas dos variables y vuelve a desplegar.

### 4. Datos de la tienda

Edita [`lib/tienda/config.ts`](lib/tienda/config.ts):

- `transferencia`: titular (razón social), RUT, correo y la lista de `cuentas` (banco, tipo y número). El cliente puede transferir a cualquiera. Si la lista queda vacía, la tienda le dice que le enviarán los datos por WhatsApp.
- `diasReserva`, `horario`, `direccion` y `whatsapp`, si cambian.

### 5. Cargar productos

Entra a `https://tu-sitio/admin`, inicia sesión y usa **Nuevo producto**. Las fotos se achican solas antes de subirse; se ven mejor con fondo blanco.

## Uso diario

- **Pedidos**: cada pedido parte en *Pendiente*. Cámbialo a *Pagado* cuando llegue la transferencia (revísala en la cartola, no solo en la captura), *Listo para retirar* cuando esté separado, y *Entregado* o *Cancelado* al final. El teléfono del cliente abre WhatsApp con un mensaje listo.
- **Stock**: cada producto tiene sus unidades disponibles. Se descuentan solas cuando llega un pedido y vuelven si lo cancelas (o si lo reactivas, se descuentan de nuevo). En la lista usa **+** y **−** para ajustes rápidos, o escribe el número exacto al editar el producto. La tienda no deja pedir más unidades de las que hay y avisa cuando quedan pocas.
- **Agotado**: es automático. Con 0 unidades el producto se sigue viendo, pero no se puede comprar.
- **Oculto** (Visible apagado): desaparece de la tienda sin borrarlo.
- **Destacado**: aparece primero en el catálogo.
- **Oferta**: llena "Precio antes de la oferta" y la tienda muestra el precio tachado.

## Cómo está armado

| Parte | Dónde |
| --- | --- |
| Base de datos, permisos y función que crea pedidos | `supabase/tienda.sql` |
| Páginas de la tienda | `app/tienda/` |
| Componentes de la tienda (tarjetas, carrito, checkout) | `components/tienda/` |
| Panel de admin | `app/admin/`, `components/admin/` |
| Configuración, tipos, categorías y carrito | `lib/tienda/` |

**Seguridad**: el navegador nunca decide el precio. La función `tienda_crear_pedido` recalcula precios y total desde la base de datos, revisa y descuenta el stock (bloqueando la fila para que dos personas no compren la misma última unidad), rechaza productos ocultos o agotados y limita los pedidos repetidos desde un mismo teléfono.

**Si ya tenías la tienda instalada**: vuelve a ejecutar `supabase/tienda.sql` completo. Agrega el stock sin borrar nada; los productos que ya existían quedan con 0 unidades hasta que les pongas su cantidad, y los pedidos anteriores no mueven el stock. Los productos solo los editan usuarios de `tienda_admins`, y los pedidos solo los ven ellos.

Para agregar o renombrar categorías hay que cambiar `lib/tienda/categorias.ts` y la lista `categoria in (...)` de `supabase/tienda.sql`.
