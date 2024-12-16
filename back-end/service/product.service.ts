import { Product } from '../model/product';
import productDb from '../repository/product.db';

const createProduct = async (productInput: {
    name: string;
    price: number;
    image: string;
    description: string;
}): Promise<Product> => {
    const product = new Product(productInput);
    return productDb.createProduct(product);
};

const getAllProducts = async (): Promise<Product[]> => {
    return productDb.getAllProducts();
};

const getProductById = async (id: number): Promise<Product | null> => {
    return productDb.getProductById({ id });
};

const updateProduct = async (
    id: number,
    productInput: { name?: string; price?: number; image?: string; description?: string }
): Promise<Product | null> => {
    const existingProduct = await productDb.getProductById({ id });
    if (!existingProduct) {
        throw new Error('Product not found');
    }

    const updatedProduct = new Product({
        id,
        name: productInput.name ?? existingProduct.getName(),
        price: productInput.price ?? existingProduct.getPrice(),
        image: productInput.image ?? existingProduct.getImage(),
        description: productInput.description ?? existingProduct.getDescription(),
    });

    return productDb.updateProduct(id, updatedProduct);
};

const deleteProduct = async (id: number): Promise<void> => {
    const existingProduct = await productDb.getProductById({ id });
    if (!existingProduct) {
        throw new Error('Product not found');
    }

    return productDb.deleteProduct(id);
};

export default {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
