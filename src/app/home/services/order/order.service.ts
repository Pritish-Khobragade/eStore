import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartStoreItem } from '../cart/cart.storeItem';
import { Order, OrderItem, OrderProduct, OrderSummary } from '../../types/order.type';
import { DeliveryAddress } from '../../types/cart.type';
import { UserService } from '../../components/users/services/user-service.service';

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(
    private httpClient: HttpClient,
    private cartStore: CartStoreItem,
    private userService: UserService
  ) { }

  saveOrder(deliveryAddress: DeliveryAddress, userEmail: string): Observable<{ message: string; orderId: number }> {
    const url: string = 'http://localhost:5001/orders/add';
    const orderDetails: OrderItem[] = [];
    this.cartStore.cart.products.forEach((product) => {
      const orderItem: OrderItem = {
        productId: product.product.id,
        price: product.product.price,
        qty: product.quantity,
        amount: product.amount
      };
      orderDetails.push(orderItem);
    });

    const order: Order = {
      userName: deliveryAddress.userName,
      address: deliveryAddress.address,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      pin: deliveryAddress.pin,
      total: this.cartStore.cart.totalAmount,
      userEmail,
      orderDetails
    };
    return this.httpClient.post<{ message: string; orderId: number }>(url, order, {
      headers: { authorization: this.userService.token },
    });
  }

  getAllOrders(): Observable<OrderSummary[]> {
    const url: string = 'http://localhost:5001/orders/allorders';
    return this.httpClient.get<OrderSummary[]>(url, {
      headers: { authorization: this.userService.token },
    });
  }

  getOrderProducts(orderId: number): Observable<OrderProduct[]> {
    const url: string = 'http://localhost:5001/orders/orderproducts';
    return this.httpClient.get<OrderProduct[]>(url, {
      headers: { authorization: this.userService.token },
      params: { orderId }
    });
  }

}
