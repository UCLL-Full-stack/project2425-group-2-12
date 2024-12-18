import express, { Request, Response, NextFunction } from 'express';
import cartService from '../service/cart.service';

const cartRouter = express.Router();

cartRouter.get('/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.params;
        const cartItems = await cartService.getCartItemsByUsername(username);
        res.status(200).json(cartItems);
    } catch (error) {
        next(error);
    }
});

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
