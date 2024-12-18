import bcrypt from 'bcrypt';
import userDB from '../repository/user.db';
import cartDB from '../repository/cart.db'; // Import cartDB
import { AuthenticationResponse, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';
import { User } from '../model/user';

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const getUserById = async (id: number): Promise<User | null> => {
    return await userDB.getUserById({ id });
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole(),
    };
};

const createUser = async ({
    username,
    password,
    firstName,
    lastName,
    email,
    role,
}: UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByUsername({ username });

    if (existingUser) {
        throw new Error(`User with username ${username} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword, firstName, lastName, email, role });

    const createdUser = await userDB.createUser(user);

    // Create an empty cart for the new user
    await cartDB.createEmptyCart(createdUser.getId()!);

    return createdUser;
};

export default { getUserByUsername, authenticate, createUser, getAllUsers, getUserById };
