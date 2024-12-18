import { CartProduct as CartProductPrisma } from '@prisma/client';

export class CartProduct {
    private id?: number;
    private cartId: number;
    private productId: number;
    private quantity: number;

    constructor(cartProduct: { id?: number; cartId: number; productId: number; quantity: number }) {
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

    static from(cartProduct: CartProductPrisma): CartProduct {
        return new CartProduct({
            id: cartProduct.id,
            cartId: cartProduct.cartId,
            productId: cartProduct.productId,
            quantity: cartProduct.quantity,
        });
    }
}
