import { Subscription } from 'rxjs';
import { PastOrder, PastOrderProduct } from './../../types/order.type';
import { OrderService } from './../../services/order/order.service';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../users/services/user-service.service';

@Component({
  selector: 'app-pastorders',
  standalone: true,
  imports: [NgForOf, CurrencyPipe],
  templateUrl: './pastorders.component.html',
  styleUrl: './pastorders.component.scss'
})
export class PastordersComponent implements OnInit,OnDestroy {
  PastOrderProducts: PastOrderProduct[] = [];
  pastOrder: PastOrder = {
    orderId: 0,
    userName: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    total: 0,
    orderDate: ''
  };
  pastOrders: PastOrder[] = [];
  private readonly subscriptions = new Subscription();

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ){}

  ngOnInit(): void{
    this.subscriptions.add(
      this.orderService.getOrders(this.userService.loggedInUser.email).subscribe({
        next: (pastOrders) => {
          this.pastOrders = pastOrders;
        },
        error: () => {
          this.pastOrders = [];
        }
      })
    );
  }

  selectOrder(event: Event): void {
    const orderId = Number.parseInt((event.target as HTMLSelectElement).value, 10);
    const selectedOrder = this.pastOrders.find((order) => order.orderId === orderId);

    if (selectedOrder) {
      this.pastOrder = selectedOrder;
      this.getOrderProducts(orderId);
    } else {
      this.PastOrderProducts = [];
    }
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.onerror = null;
    image.src = 'https://img.magnific.com/premium-photo/young-sexy-girl-jacket-mockup_179373-618.jpg?semt=ais_hybrid&w=740&q=80';
  }

   getOrderProducts(orderId: number): void{
    this.subscriptions.add(
      this.orderService
      .getOrderProducts(orderId)
       .subscribe((products) => {
         this.PastOrderProducts = products;
       })
    );
   }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
