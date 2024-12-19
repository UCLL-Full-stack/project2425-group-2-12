export enum Role {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
    GUEST = 'guest',
}

type UserInput = {
    id?: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
};

type ProductInput = {
    id?: number;
    name: string;
    price: number;
    image: string;
    description: string;
};

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
};

export { UserInput, ProductInput, AuthenticationResponse };
