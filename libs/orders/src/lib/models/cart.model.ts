export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartItemsDetailed{
product:any,
quantity: number;
}
