import { Cart as CartPrisma } from '@prisma/client';

export class Cart {
    private id?: number;
    private userId: number;
    private items: any;

    constructor(cart: { id?: number; userId: number; items: any }) {
        this.id = cart.id;
        this.userId = cart.userId;
        this.items = cart.items;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUserId(): number {
        return this.userId;
    }

    getItems(): any {
        return this.items;
    }

    static from(cart: CartPrisma): Cart {
        return new Cart({
            id: cart.id,
            userId: cart.userId,
            items: cart.items,
        });
    }
}
