import database from './database';
import { Cart } from '../model/cart';

const getCartByUserId = async (userId: number): Promise<Cart | null> => {
    try {
        const cart = await database.cart.findUnique({
            where: { userId },
            include: { products: true },
        });
        return cart ? Cart.from(cart) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateCart = async (
    userId: number,
    items: { productId: number; quantity: number }[]
): Promise<Cart> => {
    try {
        const cart = await database.cart.upsert({
            where: { userId },
            update: {
                products: {
                    deleteMany: {},
                    create: items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
            create: {
                userId,
                products: {
                    create: items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
            include: { products: true },
        });
        return Cart.from(cart);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getCartByUserId,
    updateCart,
};
