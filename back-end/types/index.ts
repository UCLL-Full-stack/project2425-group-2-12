type Role = 'admin' | 'guest';

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

export { Role, UserInput, ProductInput, AuthenticationResponse };
