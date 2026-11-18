import { AsyncPipe, CurrencyPipe, NgForOf, NgIf, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RatingsComponent } from '../../../../shared/components/ratings/ratings.component';
import { CartStoreItem } from './../../../services/cart/cart.storeItem';
import { CartItem, DeliveryAddress } from './../../../types/cart.type';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../users/services/user-service.service';
import { loggedInUser } from '../../../types/user.type';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgForOf, NgIf, RatingsComponent, RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  readonly cart$;
  deliveryForm!: FormGroup;
  private readonly subscriptions = new Subscription();
  private user: loggedInUser = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    email: ''
  };
  alertType: number = 0;
  alertMessage: string = '';
  disableCheckout: boolean = false;

  constructor(
    private cartStore: CartStoreItem,
    private fb: FormBuilder,
    private userService: UserService,
    private orderService: OrderService
  ) {
    this.cart$ = this.cartStore.cart$;

    this.subscriptions.add(
      this.userService.loggedInUser$.subscribe((loggedUser: loggedInUser) => {
        this.user = loggedUser;
        if (this.deliveryForm) {
          this.setDeliveryAddress(loggedUser);
        }
      })
    );
  }

  ngOnInit(): void {
    this.deliveryForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', Validators.required]
    });

    this.setDeliveryAddress(this.user);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private setDeliveryAddress(user: loggedInUser): void {
    this.deliveryForm.patchValue({
      name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      address: user.address ?? '',
      city: user.city ?? '',
      state: user.state ?? '',
      pin: user.pin ?? ''
    });
  }

  onSubmit(): void {
    if (this.deliveryForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      return;
    }

    if (!this.userService.isUserAuthenticated) {
      this.alertType = 2;
      this.alertMessage = 'Please log in to register your order.';
      return;
    }

    const deliveryAddress: DeliveryAddress = {
      userName: this.deliveryForm.get('name')?.value,
      address: this.deliveryForm.get('address')?.value,
      city: this.deliveryForm.get('city')?.value,
      state: this.deliveryForm.get('state')?.value,
      pin: this.deliveryForm.get('pin')?.value
    };

    this.subscriptions.add(
      this.orderService.saveOrder(deliveryAddress, this.user.email).subscribe({
        next: () => {
          this.cartStore.clearCart();
          this.alertType = 0;
          this.alertMessage = 'Order registered successfully!';
          this.disableCheckout = true;
        },
        error: (error) => {
          this.alertType = 2;
          if (error.error?.message === 'Authorization failed') {
            this.alertMessage = 'Please log in to register your order.';
          } else {
            this.alertMessage = error.error?.message ?? 'Unable to register your order.';
          }
        }
      })
    );
  }

  updateQuantity(action: '+' | '-', cartItem: CartItem): void {
    if (action === '+') {
      this.cartStore.addProduct(cartItem.product);
    } else if (action === '-') {
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem): void {
    this.cartStore.removeProduct(cartItem);
  }
}
