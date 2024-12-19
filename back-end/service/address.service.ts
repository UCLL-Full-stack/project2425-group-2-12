import addressDb from '../repository/address.db';
import userDb from '../repository/user.db';
import { Address } from '../model/address';

const getAddressByUsername = async (username: string): Promise<Address> => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    const address = await addressDb.getAddressByUserId(user.getId()!);
    if (!address) {
        throw new Error(`Address for user with username: ${username} does not exist.`);
    }
    return address;
};

const updateAddressByUsername = async (username: string, addressData: any): Promise<Address> => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    const updatedAddress = await addressDb.updateAddressByUserId(user.getId()!, addressData);
    return updatedAddress;
};

export default { getAddressByUsername, updateAddressByUsername };
