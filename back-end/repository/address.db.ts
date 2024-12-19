import database from './database';
import { Address } from '../model/address';

const createAddress = async (address: Address): Promise<Address> => {
    try {
        const addressPrisma = await database.address.create({
            data: {
                street: address.getStreet(),
                house: address.getHouse(),
                postalCode: address.getPostalCode(),
                city: address.getCity(),
                country: address.getCountry(),
                userId: address.getUserId(),
            },
        });

        return Address.from(addressPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAddressByUserId = async (userId: number): Promise<Address | null> => {
    try {
        const addressPrisma = await database.address.findUnique({
            where: { userId },
        });

        return addressPrisma ? Address.from(addressPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateAddressByUserId = async (userId: number, addressData: any): Promise<Address> => {
    try {
        if (!addressData) {
            throw new Error('Address data is undefined');
        }
        const updatedAddress = await database.address.update({
            where: { userId },
            data: {
                street: addressData.street,
                house: addressData.house,
                postalCode: addressData.postalCode,
                city: addressData.city,
                country: addressData.country,
            },
        });
        return Address.from(updatedAddress);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { createAddress, getAddressByUserId, updateAddressByUserId };
