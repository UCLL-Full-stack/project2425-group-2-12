import { Product } from '../../model/product';
import { test, expect } from '@jest/globals';

const product = new Product({
    name: 'Laptop',
    price: 999.99,
    image: 'laptop.png',
    description: 'A high-end laptop',
});

test('given: valid values for product, when: product is created, then: product is created with those values', () => {
    expect(product.getName()).toBe('Laptop');
    expect(product.getPrice()).toBe(999.99);
    expect(product.getImage()).toBe('laptop.png');
    expect(product.getDescription()).toBe('A high-end laptop');
});

test('given: missing name, when: product is created, then: an error is thrown', () => {
    expect(() => {
        new Product({
            name: '',
            price: 999.99,
            image: 'laptop.png',
            description: 'A high-end laptop',
        });
    }).toThrow('Name is required');
});

test('given: missing price, when: product is created, then: an error is thrown', () => {
    expect(() => {
        new Product({
            name: 'Laptop',
            price: NaN,
            image: 'laptop.png',
            description: 'A high-end laptop',
        });
    }).toThrow('Price is required');
});

test('given: missing image, when: product is created, then: an error is thrown', () => {
    expect(() => {
        new Product({
            name: 'Laptop',
            price: 999.99,
            image: '',
            description: 'A high-end laptop',
        });
    }).toThrow('Image is required');
});

test('given: missing description, when: product is created, then: an error is thrown', () => {
    expect(() => {
        new Product({
            name: 'Laptop',
            price: 999.99,
            image: 'laptop.png',
            description: '',
        });
    }).toThrow('Description is required');
});

test('given: two products with the same values, when: checking equality, then: they are equal', () => {
    const product2 = new Product({
        name: 'Laptop',
        price: 999.99,
        image: 'laptop.png',
        description: 'A high-end laptop',
    });

    expect(product.equals(product2)).toBe(true);
});

test('given: two products with different values, when: checking equality, then: they are not equal', () => {
    const product2 = new Product({
        name: 'Smartphone',
        price: 699.99,
        image: 'smartphone.png',
        description: 'A high-end smartphone',
    });

    expect(product.equals(product2)).toBe(false);
});

test('given: a product, when: getting the name, then: the correct name is returned', () => {
    expect(product.getName()).toBe('Laptop');
});

test('given: a product, when: getting the price, then: the correct price is returned', () => {
    expect(product.getPrice()).toBe(999.99);
});

test('given: a product, when: getting the image, then: the correct image is returned', () => {
    expect(product.getImage()).toBe('laptop.png');
});

test('given: a product, when: getting the description, then: the correct description is returned', () => {
    expect(product.getDescription()).toBe('A high-end laptop');
});
