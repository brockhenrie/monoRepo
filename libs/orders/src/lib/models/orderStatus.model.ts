export const ORDER_STATUS= {
  0: {
    label:'Pending',
    color:'primary',
    value:0
  },
  1:{
    label:'Processed',
    color:'warning',
    value:1
  },
  2: {
    label:'Shipped',
    color:'warning',
    value:2
  },
 3: {
    label:'Delivered',
    color:'success',
    value:3
  },
  4: {
    label:'Failed',
    color:'danger',
    value:4
  }
}


export interface OrderStatus{ [value:number]: string, label: string; color: string; }
