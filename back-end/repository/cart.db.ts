import database from './database';
import { Cart } from '../model/cart';

const getCartByUserId = async (userId: number): Promise<Cart | null> => {
    try {
        const cart = await database.cart.findUnique({
            where: { userId },
        });
        return cart ? Cart.from(cart) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateCart = async (userId: number, items: any): Promise<Cart> => {
    try {
        const cart = await database.cart.upsert({
            where: { userId },
            update: { items },
            create: { userId, items },
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
