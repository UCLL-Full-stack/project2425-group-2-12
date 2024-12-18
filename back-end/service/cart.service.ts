import cartDb from '../repository/cart.db';
import userDb from '../repository/user.db';
import productDb from '../repository/product.db';

const getCartItemsByUsername = async (username: string) => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    const cart = await cartDb.getCartItemsByUserId(user.getId()!);
    const cartProducts = cart.getProducts();

    // Fetch product details for each cart item
    const products = await Promise.all(
        cartProducts.map(async (cartProduct) => {
            const product = await productDb.getProductById({ id: cartProduct.getProductId() });
            return {
                ...cartProduct,
                productName: product?.getName(),
                productDescription: product?.getDescription(),
                productPrice: product?.getPrice(),
                productImage: product?.getImage(),
            };
        })
    );

    return products;
};

const addProductToCart = async (username: string, productId: number, quantity: number) => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    const cart = await cartDb.getCartItemsByUserId(user.getId()!);
    const updatedCart = await cartDb.addProductToCart(cart.getId()!, productId, quantity);
    return updatedCart;
};

const removeProductFromCart = async (username: string, productId: number) => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    const cart = await cartDb.getCartItemsByUserId(user.getId()!);
    const updatedCart = await cartDb.removeProductFromCart(cart.getId()!, productId);
    return updatedCart;
};

export default { getCartItemsByUsername, addProductToCart, removeProductFromCart };
