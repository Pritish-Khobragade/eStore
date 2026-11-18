import { StoreItem } from './../../../shared/storeItems';
import { Cart, CartItem } from '../../types/cart.type';
import { Product } from '../../types/products.type';
import { Observable } from 'rxjs';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

function loadStoredCart(platformId: Object): Cart {
    const emptyCart: Cart = { products: [], totalAmount: 0, totalProducts: 0 };
    if (!isPlatformBrowser(platformId)) {
        return emptyCart;
    }

    const storedCart = sessionStorage.getItem('cart');
    if (!storedCart) {
        return emptyCart;
    }

    try {
        const parsed: unknown = JSON.parse(storedCart);
        if (
            typeof parsed === 'object' &&
            parsed !== null &&
            'products' in parsed &&
            Array.isArray(parsed.products) &&
            'totalAmount' in parsed &&
            typeof parsed.totalAmount === 'number' &&
            'totalProducts' in parsed &&
            typeof parsed.totalProducts === 'number'
        ) {
            return parsed as Cart;
        }

        throw new TypeError('Stored cart has an invalid shape.');
    } catch (error) {
        console.error('Unable to restore the saved cart; starting with an empty cart.', error);
        sessionStorage.removeItem('cart');
        return emptyCart;
    }
}

@Injectable({ providedIn: 'root' })
export class CartStoreItem extends StoreItem<Cart> {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        super(loadStoredCart(platformId));
    }


    get cart$(): Observable < Cart > {
            return this.value$;
        }

    get cart(): Cart {
            return this.value;
        }

        addProduct(product: Product): void {
            const price = Number(product.price);
            if(!Number.isFinite(price)) {
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
        this.saveCart();
    }

    removeProduct(cartItem: CartItem): void {
        this.updateCart(this.cart.products.filter((item) => item.product.id !== cartItem.product.id));

        this.saveCart();
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
        this.saveCart();
    }

    private updateCart(products: CartItem[]): void {
        this.setValue({
            products,
            totalProducts: products.reduce((total, item) => total + item.quantity, 0),
            totalAmount: products.reduce((total, item) => total + item.amount, 0)
        });
    }


    saveCart(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        if (this.cart.totalProducts === 0) {
            sessionStorage.removeItem('cart');
            return;
        }

        sessionStorage.setItem('cart', JSON.stringify(this.cart));
    }

    clearCart(): void {
        this.updateCart([]);
        this.saveCart();
    }

}
