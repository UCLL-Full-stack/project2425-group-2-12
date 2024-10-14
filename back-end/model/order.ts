export class Order {
    // private variable instances
    private id?: number; // id is optional (?)
    private order_date: Date;
    private total_amount: number;

    // constructor
    constructor(order: { id?: number; order_date: Date; total_amount: number }) {
        this.id = order.id;
        this.order_date = order.order_date;
        this.total_amount = order.total_amount;
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getOrderDate(): Date {
        return this.order_date;
    }

    getTotalAmount(): number {
        return this.total_amount;
    }
}
