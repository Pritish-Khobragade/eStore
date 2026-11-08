import { StoreItem } from './../../../shared/storeItems';
import { Cart, CartItem } from '../../types/cart.type';
import { Product } from '../../types/products.type';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
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
        const price = Number(product.price);
        if (!Number.isFinite(price)) {
            throw new TypeError(`Invalid price for product ${product.id}`);
        }

        const existingItem = this.cart.products.find((item) => item.product.id === product.id);
        const products = existingItem
            ? this.cart.products.map((item) =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1, amount: item.amount + price }
                    : item
            )
            : [...this.cart.products, { product, amount: price, quantity: 1 }];

        this.updateCart(products);
    }

    removeProduct(cartItem: CartItem): void {
        this.updateCart(this.cart.products.filter((item) => item.product.id !== cartItem.product.id));
    }

    decreaseProductQuantity(cartItem: CartItem): void {
        const products = this.cart.products.flatMap((item) => {
            if (item.product.id !== cartItem.product.id) {
                return [item];
            }
            if (item.quantity <= 1) {
                return [];
            }

            const price = Number(item.product.price);
            if (!Number.isFinite(price)) {
                throw new TypeError(`Invalid price for product ${item.product.id}`);
            }

            return [{ ...item, quantity: item.quantity - 1, amount: item.amount - price }];
        });

        this.updateCart(products);
    }

    private updateCart(products: CartItem[]): void {
        this.setValue({
            products,
            totalProducts: products.reduce((total, item) => total + item.quantity, 0),
            totalAmount: products.reduce((total, item) => total + item.amount, 0)
        });
    }
}