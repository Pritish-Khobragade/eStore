import { CartStoreItem } from './cart.storeItem';
import { Product } from '../../types/products.type';

describe('CartStoreItem', () => {
  let cartStore: CartStoreItem;

  const product: Product = {
    id: 1,
    product_name: 'Dress',
    product_img: '',
    price: 45,
    ratings: 5,
    product_description: '',
    category_id: 1
  };

  beforeEach(() => {
    sessionStorage.removeItem('cart');
    cartStore = new CartStoreItem('browser');
  });

  it('increments quantity and amount when adding an existing product', () => {
    cartStore.addProduct(product);
    cartStore.addProduct(product);

    expect(cartStore.cart.products).toEqual([
      { product, quantity: 2, amount: 90 }
    ]);
    expect(cartStore.cart.totalProducts).toBe(2);
    expect(cartStore.cart.totalAmount).toBe(90);
  });

  it('updates totals when decreasing quantity and removing an item', () => {
    cartStore.addProduct(product);
    cartStore.addProduct(product);
    cartStore.decreaseProductQuantity(cartStore.cart.products[0]);

    expect(cartStore.cart.totalProducts).toBe(1);
    expect(cartStore.cart.totalAmount).toBe(45);

    cartStore.removeProduct(cartStore.cart.products[0]);
    expect(cartStore.cart.products).toEqual([]);
    expect(cartStore.cart.totalProducts).toBe(0);
    expect(cartStore.cart.totalAmount).toBe(0);
  });
});
