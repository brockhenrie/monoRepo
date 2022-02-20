import { User } from "@b-henrie-dev/users";
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
  user?:any;
  dateOrdered?:string;

}
