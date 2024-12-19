import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.cartProduct.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.address.deleteMany();
    await prisma.user.deleteMany();
    await prisma.product.deleteMany();

    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('admin123', 12),
            firstName: 'admin',
            lastName: 'admin',
            email: 'administration@ucll.be',
            role: 'admin',
        },
    });

    const user = await prisma.user.create({
        data: {
            username: 'user',
            password: await bcrypt.hash('user123', 12),
            firstName: 'user',
            lastName: 'user',
            email: 'user@ucll.be',
            role: 'customer',
        },
    });

    await prisma.address.create({
        data: {
            street: 'Admin Street',
            house: '1A',
            postalCode: '12345',
            city: 'Admin City',
            country: 'Admin Country',
            userId: admin.id,
        },
    });

    await prisma.address.create({
        data: {
            street: 'User Street',
            house: '2B',
            postalCode: '67890',
            city: 'User City',
            country: 'User Country',
            userId: user.id,
        },
    });

    const product1 = await prisma.product.create({
        data: {
            name: 'Draagbare Radio',
            price: 49.95,
            image: '/images/product1.png',
            description: 'Altijd Bereid in Nood – Kies de Noodradio Rood',
        },
    });

    const product2 = await prisma.product.create({
        data: {
            name: 'Kinderbed',
            price: 477.95,
            image: '/images/product2.png',
            description: 'stijlvol kinderbed met opbergruimte',
        },
    });

    const product3 = await prisma.product.create({
        data: {
            name: 'Haribo Bananas',
            price: 8.69,
            image: '/images/product3.png',
            description: 'Van deze bananen blijft niet eens de schil over!',
        },
    });

    // Create empty carts for the users
    const adminCart = await prisma.cart.create({
        data: {
            userId: admin.id,
        },
    });

    const userCart = await prisma.cart.create({
        data: {
            userId: user.id,
        },
    });

    // Add items to the carts
    await prisma.cartProduct.create({
        data: {
            cartId: adminCart.id,
            productId: product1.id,
            quantity: 1,
        },
    });

    await prisma.cartProduct.create({
        data: {
            cartId: userCart.id,
            productId: product2.id,
            quantity: 1,
        },
    });
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
