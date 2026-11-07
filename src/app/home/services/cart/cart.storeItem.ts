import { StoreItem } from './../../../shared/storeItems';
import { Cart, CartItem } from '../../types/cart.type';
import { Product } from '../../types/products.type';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CartStoreItem extends StoreItem<Cart> {
    constructor() {
        super({
            products: [],
            totalAmount: 0,
            totalProducts: 0
        });
    }

    get cart$(): Observable<Cart> {
        return this.value$;
    }

    get cart(): Cart {
        return this.value;
    }

    addProduct(product: Product): void {
        const cartProduct: CartItem | undefined = this.cart.products.find((cartProduct) => cartProduct.product.id === product.id);

        if (!cartProduct) {
            this.cart.products = [
                ...this.cart.products,
                {
                    product,
                    amount: product.price,
                    quantity: 1
                }
            ];
        } else {
            cartProduct.quantity++;
            cartProduct.amount += product.price;
        }

        this.cart.totalAmount += product.price;
        this.cart.totalProducts++;
        this.setValue(this.cart);
    }
}