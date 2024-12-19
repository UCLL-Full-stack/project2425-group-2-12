import express, { Request, Response, NextFunction } from 'express';
import addressService from '../service/address.service';
import { Address } from '../model/address';

const addressRouter = express.Router();

/**
 * @swagger
 * /address/{username}:
 *   get:
 *     summary: Get address by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user
 *     responses:
 *       200:
 *         description: Address object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 */
addressRouter.get('/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.params;
        const address = await addressService.getAddressByUsername(username);
        res.status(200).json(address);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /address/{username}:
 *   put:
 *     summary: Update address by username
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
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Updated address object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 */
addressRouter.put('/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.params;
        const address = req.body;
        const updatedAddress = await addressService.updateAddressByUsername(username, address);
        res.status(200).json(updatedAddress);
    } catch (error) {
        next(error);
    }
});

export { addressRouter };
