export interface OrderItem{
    productId: number;
    qty: number;
    price: number;
    amount: number;
}

export interface Order{
    userName: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    total: number;
    userEmail: string;
    orderDetails: OrderItem[];
}

export interface OrderSummary {
    orderId: number;
    userName: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    total: number;
    orderDate: string;
}

export interface OrderProduct extends OrderItem {
    productName: string;
}