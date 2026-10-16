export type CategoriaId =
  | 'cepillos'
  | 'pastas'
  | 'enjuagues'
  | 'interdental'
  | 'ortodoncia'
  | 'ninos'
  | 'protesis'
  | 'kits';

export type Producto = {
  id: string;
  slug: string;
  nombre: string;
  marca: string | null;
  descripcion: string | null;
  categoria: CategoriaId;
  precio: number;
  precio_anterior: number | null;
  /** Unidades disponibles. Se descuenta sola con cada pedido. */
  stock: number;
  imagen_url: string | null;
  imagen_path: string | null;
  visible: boolean;
  /** Lo calcula la base de datos: true cuando stock = 0. */
  agotado: boolean;
  destacado: boolean;
  created_at: string;
  updated_at: string;
};

export type MetodoPago = 'transferencia' | 'pago_al_retirar';

export type EstadoPedido = 'pendiente' | 'pagado' | 'listo' | 'entregado' | 'cancelado';

export type ItemPedido = {
  producto_id: string;
  nombre: string;
  marca: string | null;
  precio: number;
  cantidad: number;
  subtotal: number;
};

export type Pedido = {
  id: string;
  numero: number;
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_email: string | null;
  metodo_pago: MetodoPago;
  nota: string | null;
  /** Día en que el cliente viene a retirar ("2026-10-17"). Los pedidos antiguos no lo tienen. */
  fecha_retiro: string | null;
  items: ItemPedido[];
  total: number;
  estado: EstadoPedido;
  created_at: string;
  updated_at: string;
};
