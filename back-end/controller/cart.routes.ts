import express, { Request, Response, NextFunction } from 'express';
import cartService from '../service/cart.service';

const cartRouter = express.Router();

/**
 * @swagger
 * /cart/{username}:
 *   get:
 *     summary: Get cart items by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user
 *     responses:
 *       200:
 *         description: A list of cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
cartRouter.get('/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.params;
        const cartItems = await cartService.getCartItemsByUsername(username);
        res.status(200).json(cartItems);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /cart/{username}:
 *   post:
 *     summary: Add a product to the cart
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
cartRouter.post('/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.params;
        const { productId, quantity } = req.body;
        const updatedCart = await cartService.addProductToCart(username, productId, quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /cart/{username}/{productId}:
 *   delete:
 *     summary: Remove a product from the cart
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to remove
 *     responses:
 *       200:
 *         description: Updated cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
cartRouter.delete(
    '/:username/:productId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, productId } = req.params;
            const updatedCart = await cartService.removeProductFromCart(
                username,
                Number(productId)
            );
            res.status(200).json(updatedCart);
        } catch (error) {
            next(error);
        }
    }
);

export { cartRouter };
