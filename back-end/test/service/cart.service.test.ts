import cartDb from '../../repository/cart.db';
import userDb from '../../repository/user.db';
import productDb from '../../repository/product.db';
import cartService from '../../service/cart.service';
import { Cart } from '../../model/cart';
import { User } from '../../model/user';
import { Product } from '../../model/product';
import { CartProduct } from '../../model/cartProduct';
import { Role } from '../../types';

jest.mock('../../repository/cart.db');
jest.mock('../../repository/user.db');
jest.mock('../../repository/product.db');

const mockGetUserByUsername = userDb.getUserByUsername as jest.Mock;
const mockGetCartItemsByUserId = cartDb.getCartItemsByUserId as jest.Mock;
const mockAddProductToCart = cartDb.addProductToCart as jest.Mock;
const mockRemoveProductFromCart = cartDb.removeProductFromCart as jest.Mock;
const mockGetProductById = productDb.getProductById as jest.Mock;

const user = new User({
    id: 1,
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    role: Role.CUSTOMER,
});

const product = new Product({
    id: 1,
    name: 'Laptop',
    price: 999.99,
    image: 'laptop.png',
    description: 'A high-end laptop',
});

const cartProduct = new CartProduct({
    id: 1,
    cartId: 1,
    productId: 1,
    quantity: 1,
});

const cart = new Cart({
    id: 1,
    userId: user.getId()!,
    products: [cartProduct],
});

beforeEach(() => {
    jest.clearAllMocks();
});

test('given a valid username, when getting cart items, then cart items are returned', async () => {
    // given
    mockGetUserByUsername.mockResolvedValue(user);
    mockGetCartItemsByUserId.mockResolvedValue(cart);
    mockGetProductById.mockResolvedValue(product);

    // when
    const result = await cartService.getCartItemsByUsername('johndoe');

    // then
    expect(result).toEqual([
        {
            ...cart.getProducts()[0],
            productName: product.getName(),
            productDescription: product.getDescription(),
            productPrice: product.getPrice(),
            productImage: product.getImage(),
        },
    ]);
    expect(mockGetUserByUsername).toHaveBeenCalledWith({ username: 'johndoe' });
    expect(mockGetCartItemsByUserId).toHaveBeenCalledWith(user.getId());
});

test('given a valid username and product, when adding product to cart, then product is added', async () => {
    // given
    mockGetUserByUsername.mockResolvedValue(user);
    mockGetCartItemsByUserId.mockResolvedValue(cart);
    mockAddProductToCart.mockResolvedValue(cart);

    // when
    const result = await cartService.addProductToCart('johndoe', product.getId()!, 1);

    // then
    expect(result).toEqual(cart);
    expect(mockGetUserByUsername).toHaveBeenCalledWith({ username: 'johndoe' });
    expect(mockAddProductToCart).toHaveBeenCalledWith(cart.getId(), product.getId(), 1);
});

test('given a valid username and product, when removing product from cart, then product is removed', async () => {
    // given
    mockGetUserByUsername.mockResolvedValue(user);
    mockGetCartItemsByUserId.mockResolvedValue(cart);
    mockRemoveProductFromCart.mockResolvedValue(cart);

    // when
    const result = await cartService.removeProductFromCart('johndoe', product.getId()!);

    // then
    expect(result).toEqual(cart);
    expect(mockGetUserByUsername).toHaveBeenCalledWith({ username: 'johndoe' });
    expect(mockRemoveProductFromCart).toHaveBeenCalledWith(cart.getId(), product.getId());
});

test('given a non-existing username, when getting cart items, then an error is thrown', async () => {
    // given
    mockGetUserByUsername.mockResolvedValue(null);

    // when
    const getCartItems = async () => await cartService.getCartItemsByUsername('nonexistent');

    // then
    expect(getCartItems).rejects.toThrow('User with username: nonexistent does not exist.');
    expect(mockGetUserByUsername).toHaveBeenCalledWith({ username: 'nonexistent' });
});
