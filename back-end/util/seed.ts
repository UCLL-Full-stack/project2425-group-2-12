import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.cartProduct.deleteMany();
    await prisma.cart.deleteMany();
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
            role: 'user',
        },
    });

    const product1 = await prisma.product.create({
        data: {
            name: 'Product 1',
            price: 29.99,
            image: '/images/product1.png',
            description: 'Description for Product 1',
        },
    });

    const product2 = await prisma.product.create({
        data: {
            name: 'Product 2',
            price: 49.99,
            image: '/images/product2.png',
            description: 'Description for Product 2',
        },
    });

    const product3 = await prisma.product.create({
        data: {
            name: 'Product 3',
            price: 19.99,
            image: '/images/product3.png',
            description: 'Description for Product 3',
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
