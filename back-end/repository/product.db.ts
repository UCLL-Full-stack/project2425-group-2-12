import database from './database';
import { Product } from '../model/product';

const createProduct = async (product: Product): Promise<Product> => {
    try {
        const productPrisma = await database.product.create({
            data: {
                name: product.getName(),
                price: product.getPrice(),
                image: product.getImage(),
                description: product.getDescription(),
            },
        });

        return Product.from(productPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllProducts = async (): Promise<Product[]> => {
    try {
        const productsPrisma = await database.product.findMany();
        return productsPrisma.map((productPrisma) => Product.from(productPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getProductById = async ({ id }: { id: number }): Promise<Product | null> => {
    try {
        const productPrisma = await database.product.findUnique({
            where: { id },
        });

        return productPrisma ? Product.from(productPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateProduct = async (id: number, product: Partial<Product>): Promise<Product | null> => {
    try {
        const existingProduct = await database.product.findUnique({
            where: { id },
        });

        if (!existingProduct) {
            throw new Error('Product not found');
        }

        const updatedProductData = {
            name: product.getName ? product.getName() : existingProduct.name,
            price: product.getPrice ? product.getPrice() : existingProduct.price,
            image: product.getImage ? product.getImage() : existingProduct.image,
            description: product.getDescription
                ? product.getDescription()
                : existingProduct.description,
        };

        const productPrisma = await database.product.update({
            where: { id },
            data: updatedProductData,
        });

        return Product.from(productPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteProduct = async (id: number): Promise<void> => {
    try {
        // Delete associated CartProduct records first
        await database.cartProduct.deleteMany({
            where: { productId: id },
        });

        // Then delete the product
        await database.product.delete({
            where: { id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
