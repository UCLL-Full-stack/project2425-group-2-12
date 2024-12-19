import { CartProduct } from '../../model/cartProduct';
import { test, expect } from '@jest/globals';

const cartProduct = new CartProduct({
    cartId: 1,
    productId: 1,
    quantity: 2,
});

test('given: valid values for cartProduct, when: cartProduct is created, then: cartProduct is created with those values', () => {
    expect(cartProduct.getCartId()).toBe(1);
    expect(cartProduct.getProductId()).toBe(1);
    expect(cartProduct.getQuantity()).toBe(2);
});

test('given: missing cartId, when: cartProduct is created, then: an error is thrown', () => {
    expect(() => {
        new CartProduct({
            cartId: undefined as any, // Provide an invalid value for cartId
            productId: 1,
            quantity: 2,
        });
    }).toThrow('Cart ID is required');
});

test('given: missing productId, when: cartProduct is created, then: an error is thrown', () => {
    expect(() => {
        new CartProduct({
            cartId: 1,
            productId: undefined as any, // Provide an invalid value for productId
            quantity: 2,
        });
    }).toThrow('Product ID is required');
});

test('given: missing quantity, when: cartProduct is created, then: an error is thrown', () => {
    expect(() => {
        new CartProduct({
            cartId: 1,
            productId: 1,
            quantity: undefined as any, // Provide an invalid value for quantity
        });
    }).toThrow('Quantity is required');
});

test('given: two cartProducts with the same values, when: checking equality, then: they are equal', () => {
    const cartProduct2 = new CartProduct({
        cartId: 1,
        productId: 1,
        quantity: 2,
    });

    expect(cartProduct.equals(cartProduct2)).toBe(true);
});

test('given: two cartProducts with different values, when: checking equality, then: they are not equal', () => {
    const cartProduct2 = new CartProduct({
        cartId: 1,
        productId: 2,
        quantity: 2,
    });

    expect(cartProduct.equals(cartProduct2)).toBe(false);
});

test('given: a cartProduct, when: getting the cartId, then: the correct cartId is returned', () => {
    expect(cartProduct.getCartId()).toBe(1);
});

test('given: a cartProduct, when: getting the productId, then: the correct productId is returned', () => {
    expect(cartProduct.getProductId()).toBe(1);
});

test('given: a cartProduct, when: getting the quantity, then: the correct quantity is returned', () => {
    expect(cartProduct.getQuantity()).toBe(2);
});
