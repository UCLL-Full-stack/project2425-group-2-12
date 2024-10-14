import { Order } from '../../model/order';

test('given: valid values for order, when: order is created, then: order is created with those values', () => {
    // given

    // when
    const order = new Order({
        order_date: new Date(2024, 10, 10),
        total_amount: 2,
    });

    // then
    expect(order.getOrderDate()).toEqual(new Date(2024, 10, 10))
    expect(order.getTotalAmount()).toEqual(2)
});
