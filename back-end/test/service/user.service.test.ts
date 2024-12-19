import bcrypt from 'bcrypt';
import userDb from '../../repository/user.db';
import cartDb from '../../repository/cart.db';
import addressDb from '../../repository/address.db';
import userService from '../../service/user.service';
import { User } from '../../model/user';
import { generateJwtToken } from '../../util/jwt';
import { UserInput, Address, Role } from '../../types';

jest.mock('../../repository/user.db');
jest.mock('../../repository/cart.db');
jest.mock('../../repository/address.db');
jest.mock('bcrypt');
jest.mock('../../util/jwt');

const mockGetUserByUsername = userDb.getUserByUsername as jest.Mock;
const mockGetAllUsers = userDb.getAllUsers as jest.Mock;
const mockGetUserById = userDb.getUserById as jest.Mock;
const mockCreateUser = userDb.createUser as jest.Mock;
const mockCreateEmptyCart = cartDb.createEmptyCart as jest.Mock;
const mockCreateAddress = addressDb.createAddress as jest.Mock;
const mockGenerateJwtToken = generateJwtToken as jest.Mock;
const mockBcryptCompare = bcrypt.compare as jest.Mock;
const mockBcryptHash = bcrypt.hash as jest.Mock;

const user = new User({
    id: 1,
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    role: Role.CUSTOMER,
});

const address: Address = {
    street: 'Main St',
    house: '123',
    postalCode: '12345',
    city: 'Anytown',
    country: 'Country',
};

const userInput: UserInput = {
    username: 'johndoe',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: Role.CUSTOMER,
    address: address,
};

beforeEach(() => {
    jest.clearAllMocks();
});

test('given a valid username, when getting user by username, then user is returned', async () => {
    mockGetUserByUsername.mockResolvedValue(user);
    const result = await userService.getUserByUsername({ username: 'johndoe' });
    expect(result).toEqual(user);
    expect(mockGetUserByUsername).toHaveBeenCalledWith({ username: 'johndoe' });
});

test('given a valid user input, when authenticating, then JWT token is returned', async () => {
    const userInput: UserInput = {
        username: 'johndoe',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: Role.CUSTOMER,
        address: {
            street: 'Main St',
            house: '123',
            postalCode: '12345',
            city: 'Anytown',
            country: 'Country',
        },
    };

    mockGetUserByUsername.mockResolvedValue(user);
    mockBcryptCompare.mockResolvedValue(true);
    mockGenerateJwtToken.mockReturnValue('jwt_token');

    const result = await userService.authenticate(userInput);
    expect(result).toEqual({
        token: 'jwt_token',
        username: 'johndoe',
        fullname: 'John Doe',
        role: Role.CUSTOMER,
    });
    expect(mockGetUserByUsername).toHaveBeenCalledWith({ username: 'johndoe' });
    expect(mockBcryptCompare).toHaveBeenCalledWith('password123', user.getPassword());
    expect(mockGenerateJwtToken).toHaveBeenCalledWith({ username: 'johndoe', role: Role.CUSTOMER });
});

test('given a valid user input, when creating user, then user is created', async () => {
    const userInput = {
        username: 'johndoe',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: Role.CUSTOMER,
        address: {
            street: 'Main St',
            house: '123',
            postalCode: '12345',
            city: 'Anytown',
            country: 'Country',
        },
    };

    mockGetUserByUsername.mockResolvedValue(null);
    mockBcryptHash.mockResolvedValue('hashed_password');
    mockCreateUser.mockResolvedValue(user);
    mockCreateAddress.mockResolvedValue(address);
    mockCreateEmptyCart.mockResolvedValue({});

    const result = await userService.createUser(userInput);
    expect(result).toEqual(user);
    expect(mockGetUserByUsername).toHaveBeenCalledWith({ username: 'johndoe' });
    expect(mockBcryptHash).toHaveBeenCalledWith('password123', 12);
    expect(mockCreateUser).toHaveBeenCalledWith(expect.any(User));
    expect(mockCreateAddress).toHaveBeenCalledWith(expect.any(Object));
    expect(mockCreateEmptyCart).toHaveBeenCalledWith(user.getId());
});

test('given a valid user ID, when getting user by ID, then user is returned', async () => {
    mockGetUserById.mockResolvedValue(user);
    const result = await userService.getUserById(1);
    expect(result).toEqual(user);
    expect(mockGetUserById).toHaveBeenCalledWith({ id: 1 });
});

test('when getting all users, then all users are returned', async () => {
    mockGetAllUsers.mockResolvedValue([user]);
    const result = await userService.getAllUsers();
    expect(result).toEqual([user]);
    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
});
