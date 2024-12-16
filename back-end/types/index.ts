type Role = 'admin' | 'student' | 'guest';

type UserInput = {
    id?: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
};

type StudentInput = {
    id?: number;
    user: UserInput;
    studentnumber: string;
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

export { Role, UserInput, StudentInput, ProductInput, AuthenticationResponse };
