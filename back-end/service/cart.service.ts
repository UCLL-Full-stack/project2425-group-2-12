import cartDb from '../repository/cart.db';

const getCartByUserId = async (userId: number) => {
    return cartDb.getCartByUserId(userId);
};

const updateCart = async (userId: number, items: any) => {
    return cartDb.updateCart(userId, items);
};

export default {
    getCartByUserId,
    updateCart,
};
