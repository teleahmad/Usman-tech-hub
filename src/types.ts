export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  userId: string;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'approved' | 'shipped';
  date: Date;
}

export interface CartItem extends Product {
  quantity: number;
}
