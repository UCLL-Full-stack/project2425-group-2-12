import { Product } from '../../model/product';

test('given: valid values for product, when: product is created, then: product is created with those values', () => {
    // given

    // when
    const apple = new Product({
        productname: 'Apple',
        description: 'Green vegtable',
        price: 2.15,
    });

    // then
    expect(apple.getProductName()).toEqual('Apple');
    expect(apple.getDescription()).toEqual('Green vegtable');
    expect(apple.getPrice()).toEqual(2.15);
});
