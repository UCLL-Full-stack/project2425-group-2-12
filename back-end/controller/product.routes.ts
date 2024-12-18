import express, { NextFunction, Request, Response } from 'express';
import productService from '../service/product.service';
import { ProductInput } from '../types';

const productRouter = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of all products
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Product'
 */
productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
productRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productService.getProductById(Number(req.params.id));
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: The created product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productInput = <ProductInput>req.body;
        const product = await productService.createProduct(productInput);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: The updated product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
productRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productInput = <ProductInput>req.body;
        const product = await productService.updateProduct(Number(req.params.id), productInput);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Product not found
 */
productRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productService.deleteProduct(Number(req.params.id));
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

export { productRouter };
