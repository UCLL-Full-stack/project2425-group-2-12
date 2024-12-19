import { Cart as CartPrisma, CartProduct as CartProductPrisma } from '@prisma/client';
import { CartProduct } from './cartProduct';

export class Cart {
    private id?: number;
    private userId: number;
    private products: CartProduct[];

    constructor(cart: { id?: number; userId: number; products: CartProduct[] }) {
        if (cart.userId === undefined || cart.userId === null) {
            throw new Error('User ID is required');
        }
        if (!cart.products || !Array.isArray(cart.products)) {
            throw new Error('Products are required');
        }

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

    addProduct(product: CartProduct): void {
        this.products.push(product);
    }

    removeProduct(product: CartProduct): void {
        this.products = this.products.filter((p) => !p.equals(product));
    }

    equals(other: Cart): boolean {
        if (this.userId !== other.userId) {
            return false;
        }
        if (this.products.length !== other.products.length) {
            return false;
        }
        for (let i = 0; i < this.products.length; i++) {
            if (!this.products[i].equals(other.products[i])) {
                return false;
            }
        }
        return true;
    }

    static from(cart: CartPrisma & { products: CartProductPrisma[] }): Cart {
        return new Cart({
            id: cart.id,
            userId: cart.userId,
            products: cart.products.map(CartProduct.from),
        });
    }
}
