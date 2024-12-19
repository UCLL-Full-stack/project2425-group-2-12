import productDb from '../../repository/product.db';
import productService from '../../service/product.service';
import { Product } from '../../model/product';

jest.mock('../../repository/product.db');

const mockCreateProduct = productDb.createProduct as jest.Mock;
const mockGetAllProducts = productDb.getAllProducts as jest.Mock;
const mockGetProductById = productDb.getProductById as jest.Mock;
const mockUpdateProduct = productDb.updateProduct as jest.Mock;
const mockDeleteProduct = productDb.deleteProduct as jest.Mock;

const productInput = {
    name: 'Laptop',
    price: 999.99,
    image: 'laptop.png',
    description: 'A high-end laptop',
};

const product = new Product({
    id: 1,
    ...productInput,
});

beforeEach(() => {
    jest.clearAllMocks();
});

test('given valid product input, when creating product, then product is created', async () => {
    // given
    mockCreateProduct.mockResolvedValue(product);

    // when
    const result = await productService.createProduct(productInput);

    // then
    expect(result).toEqual(product);
    expect(mockCreateProduct).toHaveBeenCalledWith(expect.any(Product));
});

test('when getting all products, then all products are returned', async () => {
    // given
    mockGetAllProducts.mockResolvedValue([product]);

    // when
    const result = await productService.getAllProducts();

    // then
    expect(result).toEqual([product]);
    expect(mockGetAllProducts).toHaveBeenCalledTimes(1);
});

test('given valid product ID, when getting product by ID, then product is returned', async () => {
    // given
    mockGetProductById.mockResolvedValue(product);

    // when
    const result = await productService.getProductById(1);

    // then
    expect(result).toEqual(product);
    expect(mockGetProductById).toHaveBeenCalledWith({ id: 1 });
});

test('given invalid product ID, when getting product by ID, then null is returned', async () => {
    // given
    mockGetProductById.mockResolvedValue(null);

    // when
    const result = await productService.getProductById(999);

    // then
    expect(result).toBeNull();
    expect(mockGetProductById).toHaveBeenCalledWith({ id: 999 });
});

test('given valid product ID and input, when updating product, then product is updated', async () => {
    // given
    const updatedProductInput = { ...productInput, price: 899.99 };
    const updatedProduct = new Product({ id: 1, ...updatedProductInput });
    mockGetProductById.mockResolvedValue(product);
    mockUpdateProduct.mockResolvedValue(updatedProduct);

    // when
    const result = await productService.updateProduct(1, updatedProductInput);

    // then
    expect(result).toEqual(updatedProduct);
    expect(mockGetProductById).toHaveBeenCalledWith({ id: 1 });
    expect(mockUpdateProduct).toHaveBeenCalledWith(1, expect.any(Product));
});

test('given invalid product ID, when updating product, then error is thrown', async () => {
    // given
    const updatedProductInput = { ...productInput, price: 899.99 };
    mockGetProductById.mockResolvedValue(null);

    // when
    const updateProduct = async () => await productService.updateProduct(999, updatedProductInput);

    // then
    await expect(updateProduct).rejects.toThrow('Product not found');
    expect(mockGetProductById).toHaveBeenCalledWith({ id: 999 });
});

test('given valid product ID, when deleting product, then product is deleted', async () => {
    // given
    mockGetProductById.mockResolvedValue(product);
    mockDeleteProduct.mockResolvedValue(undefined);

    // when
    await productService.deleteProduct(1);

    // then
    expect(mockGetProductById).toHaveBeenCalledWith({ id: 1 });
    expect(mockDeleteProduct).toHaveBeenCalledWith(1);
});

test('given invalid product ID, when deleting product, then error is thrown', async () => {
    // given
    mockGetProductById.mockResolvedValue(null);

    // when
    const deleteProduct = async () => await productService.deleteProduct(999);

    // then
    await expect(deleteProduct).rejects.toThrow('Product not found');
    expect(mockGetProductById).toHaveBeenCalledWith({ id: 999 });
});
