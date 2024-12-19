import addressDb from '../../repository/address.db';
import userDb from '../../repository/user.db';
import addressService from '../../service/address.service';
import { Address } from '../../model/address';
import { User } from '../../model/user';
import { Role } from '../../types';

jest.mock('../../repository/address.db');
jest.mock('../../repository/user.db');

const mockGetUserByUsername = userDb.getUserByUsername as jest.Mock;
const mockGetAddressByUserId = addressDb.getAddressByUserId as jest.Mock;
const mockUpdateAddressByUserId = addressDb.updateAddressByUserId as jest.Mock;

const user = new User({
    id: 1,
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    role: Role.CUSTOMER,
});

const address = new Address({
    street: 'Main St',
    house: '123',
    postalCode: '12345',
    city: 'Anytown',
    country: 'Country',
    userId: user.getId()!,
});

beforeEach(() => {
    jest.clearAllMocks();
});

test('given a valid username, when getting address, then address is returned', async () => {
    // given
    mockGetUserByUsername.mockResolvedValue(user);
    mockGetAddressByUserId.mockResolvedValue(address);

    // when
    const result = await addressService.getAddressByUsername('johndoe');

    // then
    expect(result).toEqual(address);
    expect(mockGetUserByUsername).toHaveBeenCalledWith({ username: 'johndoe' });
    expect(mockGetAddressByUserId).toHaveBeenCalledWith(user.getId());
});

test('given a valid username and address data, when updating address, then address is updated', async () => {
    // given
    const updatedAddressData = {
        street: 'New St',
        house: '456',
        postalCode: '67890',
        city: 'Newtown',
        country: 'New Country',
    };
    const updatedAddress = new Address({
        ...updatedAddressData,
        userId: user.getId()!,
    });

    mockGetUserByUsername.mockResolvedValue(user);
    mockUpdateAddressByUserId.mockResolvedValue(updatedAddress);

    // when
    const result = await addressService.updateAddressByUsername('johndoe', updatedAddressData);

    // then
    expect(result).toEqual(updatedAddress);
    expect(mockGetUserByUsername).toHaveBeenCalledWith({ username: 'johndoe' });
    expect(mockUpdateAddressByUserId).toHaveBeenCalledWith(user.getId(), updatedAddressData);
});

test('given a non-existing username, when getting address, then an error is thrown', async () => {
    // given
    mockGetUserByUsername.mockResolvedValue(null);

    // when
    const getAddress = async () => await addressService.getAddressByUsername('nonexistent');

    // then
    expect(getAddress).rejects.toThrow('User with username: nonexistent does not exist.');
    expect(mockGetUserByUsername).toHaveBeenCalledWith({ username: 'nonexistent' });
});

test('given a non-existing username, when updating address, then an error is thrown', async () => {
    // given
    const updatedAddressData = {
        street: 'New St',
        house: '456',
        postalCode: '67890',
        city: 'Newtown',
        country: 'New Country',
    };

    mockGetUserByUsername.mockResolvedValue(null);

    // when
    const updateAddress = async () =>
        await addressService.updateAddressByUsername('nonexistent', updatedAddressData);

    // then
    expect(updateAddress).rejects.toThrow('User with username: nonexistent does not exist.');
    expect(mockGetUserByUsername).toHaveBeenCalledWith({ username: 'nonexistent' });
});
