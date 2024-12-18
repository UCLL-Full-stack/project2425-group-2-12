import database from './database';
import { Cart } from '../model/cart';

const getCartItemsByUserId = async (userId: number) => {
    try {
        const cart = await database.cart.findUnique({
            where: { userId },
            include: { products: true },
        });
        if (!cart) {
            throw new Error('Cart not found');
        }
        return Cart.from(cart);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createEmptyCart = async (userId: number) => {
    try {
        await database.cart.create({
            data: {
                userId,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addProductToCart = async (cartId: number, productId: number, quantity: number) => {
    try {
        const existingCartProduct = await database.cartProduct.findUnique({
            where: {
                cartId_productId: {
                    cartId: cartId,
                    productId: productId,
                },
            },
        });

        if (existingCartProduct) {
            await database.cartProduct.update({
                where: { id: existingCartProduct.id },
                data: { quantity: existingCartProduct.quantity + quantity },
            });
        } else {
            await database.cartProduct.create({
                data: {
                    cartId: cartId,
                    productId: productId,
                    quantity: quantity,
                },
            });
        }

        const updatedCart = await database.cart.findUnique({
            where: { id: cartId },
            include: { products: true },
        });

        if (!updatedCart) {
            throw new Error('Cart not found');
        }

        return Cart.from(updatedCart);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getCartItemsByUserId, createEmptyCart, addProductToCart };
