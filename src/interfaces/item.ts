export interface CartItem {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  included: boolean;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}
