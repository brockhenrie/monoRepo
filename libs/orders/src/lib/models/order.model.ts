import { OrderItem } from "./orderItem.model";

export class Order {
  id?: string;
  orderItems?:OrderItem[];
  shippingAddress1?:string;
  shippingAddress2?:string;
  city?:string;
  state?:string;
  zip?:string;
  country?:string;
  phone?:string;
  status?:number;
  totalPrice?:string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?:any;
  dateOrdered?:string;

}
