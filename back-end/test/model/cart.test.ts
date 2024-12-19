import { Cart } from '../../model/cart';
import { CartProduct } from '../../model/cartProduct';
import { test, expect } from '@jest/globals';

const cartProduct = new CartProduct({
    cartId: 1,
    productId: 1,
    quantity: 2,
});

const cart = new Cart({
    userId: 1,
    products: [cartProduct],
});

test('given: valid values for cart, when: cart is created, then: cart is created with those values', () => {
    expect(cart.getUserId()).toBe(1);
    expect(cart.getProducts()).toEqual([cartProduct]);
});

test('given: missing userId, when: cart is created, then: an error is thrown', () => {
    expect(() => {
        new Cart({
            userId: undefined as any, // Provide an invalid value for userId
            products: [cartProduct],
        });
    }).toThrow('User ID is required');
});

test('given: missing products, when: cart is created, then: an error is thrown', () => {
    expect(() => {
        new Cart({
            userId: 1,
            products: undefined as any, // Provide an invalid value for products
        });
    }).toThrow('Products are required');
});

test('given: two carts with the same values, when: checking equality, then: they are equal', () => {
    const cart2 = new Cart({
        userId: 1,
        products: [cartProduct],
    });

    expect(cart.equals(cart2)).toBe(true);
});

test('given: two carts with different values, when: checking equality, then: they are not equal', () => {
    const cart2 = new Cart({
        userId: 2,
        products: [cartProduct],
    });

    expect(cart.equals(cart2)).toBe(false);
});

test('given: a cart, when: getting the userId, then: the correct userId is returned', () => {
    expect(cart.getUserId()).toBe(1);
});

test('given: a cart, when: getting the products, then: the correct products are returned', () => {
    expect(cart.getProducts()).toEqual([cartProduct]);
});

test('given: a cart, when: adding a product, then: the product is added to the cart', () => {
    const newProduct = new CartProduct({
        cartId: 1,
        productId: 2,
        quantity: 1,
    });

    cart.addProduct(newProduct);

    expect(cart.getProducts()).toContain(newProduct);
});

test('given: a cart, when: removing a product, then: the product is removed from the cart', () => {
    cart.removeProduct(cartProduct);

    expect(cart.getProducts()).not.toContain(cartProduct);
});
