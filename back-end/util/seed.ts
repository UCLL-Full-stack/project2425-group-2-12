// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.student.deleteMany();
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
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
