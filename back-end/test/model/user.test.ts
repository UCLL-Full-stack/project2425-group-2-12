import { User } from '../../model/user';
import { Address } from '../../model/address';
import { test, expect } from '@jest/globals';
import { Role } from '../../types';

const address = new Address({
    street: 'Main St',
    house: '123',
    postalCode: '12345',
    city: 'Anytown',
    country: 'Country',
    userId: 1,
});

const user = new User({
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    role: Role.CUSTOMER,
    address: address,
});

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    expect(user.getUsername()).toBe('johndoe');
    expect(user.getFirstName()).toBe('John');
    expect(user.getLastName()).toBe('Doe');
    expect(user.getEmail()).toBe('john.doe@example.com');
    expect(user.getPassword()).toBe('password123');
    expect(user.getRole()).toBe(Role.CUSTOMER);
    expect(user.getAddress()).toBe(address);
});

test('given: missing username, when: user is created, then: an error is thrown', () => {
    expect(() => {
        new User({
            username: '', // Provide a default value for username
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            role: Role.CUSTOMER,
            address: address,
        });
    }).toThrow('Username is required');
});

test('given: missing firstName, when: user is created, then: an error is thrown', () => {
    expect(() => {
        new User({
            username: 'johndoe',
            firstName: '', // Provide a default value for firstName
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            role: Role.CUSTOMER,
            address: address,
        });
    }).toThrow('First name is required');
});

test('given: missing lastName, when: user is created, then: an error is thrown', () => {
    expect(() => {
        new User({
            username: 'johndoe',
            firstName: 'John',
            lastName: '', // Provide a default value for lastName
            email: 'john.doe@example.com',
            password: 'password123',
            role: Role.CUSTOMER,
            address: address,
        });
    }).toThrow('Last name is required');
});

test('given: missing email, when: user is created, then: an error is thrown', () => {
    expect(() => {
        new User({
            username: 'johndoe',
            firstName: 'John',
            lastName: 'Doe',
            email: '', // Provide a default value for email
            password: 'password123',
            role: Role.CUSTOMER,
            address: address,
        });
    }).toThrow('Email is required');
});

test('given: missing password, when: user is created, then: an error is thrown', () => {
    expect(() => {
        new User({
            username: 'johndoe',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: '', // Provide a default value for password
            role: Role.CUSTOMER,
            address: address,
        });
    }).toThrow('Password is required');
});

test('given: missing role, when: user is created, then: an error is thrown', () => {
    expect(() => {
        new User({
            username: 'johndoe',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            role: undefined as any, // Provide a default value for role
            address: address,
        });
    }).toThrow('Role is required');
});

test('given: two users with the same values, when: checking equality, then: they are equal', () => {
    const user2 = new User({
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: Role.CUSTOMER,
        address: address,
    });

    expect(user.equals(user2)).toBe(true);
});

test('given: two users with different values, when: checking equality, then: they are not equal', () => {
    const user2 = new User({
        username: 'janedoe',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
        role: Role.CUSTOMER,
        address: address,
    });

    expect(user.equals(user2)).toBe(false);
});

test('given: a user, when: getting the address, then: the correct address is returned', () => {
    expect(user.getAddress()).toBe(address);
});

test('given: a user, when: getting the role, then: the correct role is returned', () => {
    expect(user.getRole()).toBe(Role.CUSTOMER);
});
