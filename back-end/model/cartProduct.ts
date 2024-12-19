import { CartProduct as CartProductPrisma } from '@prisma/client';

export class CartProduct {
    private id?: number;
    private cartId: number;
    private productId: number;
    private quantity: number;

    constructor(cartProduct: { id?: number; cartId: number; productId: number; quantity: number }) {
        if (cartProduct.cartId === undefined || cartProduct.cartId === null) {
            throw new Error('Cart ID is required');
        }
        if (cartProduct.productId === undefined || cartProduct.productId === null) {
            throw new Error('Product ID is required');
        }
        if (cartProduct.quantity === undefined || cartProduct.quantity === null) {
            throw new Error('Quantity is required');
        }

        this.id = cartProduct.id;
        this.cartId = cartProduct.cartId;
        this.productId = cartProduct.productId;
        this.quantity = cartProduct.quantity;
    }

    getId(): number | undefined {
        return this.id;
    }

    getCartId(): number {
        return this.cartId;
    }

    getProductId(): number {
        return this.productId;
    }

    getQuantity(): number {
        return this.quantity;
    }

    equals(other: CartProduct): boolean {
        return (
            this.cartId === other.cartId &&
            this.productId === other.productId &&
            this.quantity === other.quantity
        );
    }

    static from(cartProduct: CartProductPrisma): CartProduct {
        return new CartProduct({
            id: cartProduct.id,
            cartId: cartProduct.cartId,
            productId: cartProduct.productId,
            quantity: cartProduct.quantity,
        });
    }
}
