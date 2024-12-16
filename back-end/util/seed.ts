// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

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

    const student1 = await prisma.student.create({
        data: {
            studentnumber: 'r0785023',
            user: {
                create: {
                    username: 'peterp',
                    password: await bcrypt.hash('peterp123', 12),
                    firstName: 'Peter',
                    lastName: 'Parker',
                    email: 'peter.parker@ucll.be',
                    role: 'student',
                },
            },
        },
    });

    const student2 = await prisma.student.create({
        data: {
            studentnumber: 'r0785024',
            user: {
                create: {
                    username: 'brucew',
                    password: await bcrypt.hash('brucew123', 12),
                    firstName: 'Bruce',
                    lastName: 'Wayne',
                    email: 'bruce.wayne@ucll.be',
                    role: 'student',
                },
            },
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

    console.log({ admin, student1, student2, product1, product2, product3 });
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
