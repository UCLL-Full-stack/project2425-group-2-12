import express, { Request, Response, NextFunction } from 'express';
import cartService from '../service/cart.service';

const cartRouter = express.Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the cart for the authenticated user
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: The cart for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       image:
 *                         type: string
 *                       description:
 *                         type: string
 *       401:
 *         description: Unauthorized
 */
cartRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = user.id;
        const cart = await cartService.getCartByUserId(userId);
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        next(error);
    }
});

/**
 * @swagger
 * /cart:
 *   put:
 *     summary: Update the cart for the authenticated user
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     image:
 *                       type: string
 *                     description:
 *                         type: string
 *     responses:
 *       200:
 *         description: The updated cart for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       image:
 *                         type: string
 *                       description:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
cartRouter.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = user.id;
        const items = req.body.items;
        const cart = await cartService.updateCart(userId, items);
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error updating cart:', error);
        next(error);
    }
});

export { cartRouter };
