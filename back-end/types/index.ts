export enum Role {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
    GUEST = 'guest',
}

export type UserInput = {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    address: AddressDTO;
};

export type Address = {
    street: string;
    house: string;
    postalCode: string;
    city: string;
    country: string;
};

export type ProductInput = {
    name: string;
    price: number;
    image: string;
    description: string;
};

export type CartItem = {
    productId: number;
    quantity: number;
};

export type AuthenticationRequest = {
    username: string;
    password: string;
};

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
};

export {
    UserInput,
    Address,
    ProductInput,
    CartItem,
    AuthenticationRequest,
    AuthenticationResponse,
};
