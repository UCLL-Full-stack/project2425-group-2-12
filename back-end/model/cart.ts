import { Cart as CartPrisma, CartProduct as CartProductPrisma } from '@prisma/client';
import { CartProduct } from './cartProduct';

export class Cart {
    private id?: number;
    private userId: number;
    private products: CartProduct[];

    constructor(cart: { id?: number; userId: number; products: CartProduct[] }) {
        this.id = cart.id;
        this.userId = cart.userId;
        this.products = cart.products;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUserId(): number {
        return this.userId;
    }

    getProducts(): CartProduct[] {
        return this.products;
    }

    static from(cart: CartPrisma & { products: CartProductPrisma[] }): Cart {
        return new Cart({
            id: cart.id,
            userId: cart.userId,
            products: cart.products.map(CartProduct.from),
        });
    }
}
