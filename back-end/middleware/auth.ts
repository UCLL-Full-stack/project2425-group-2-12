import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '../types';

interface CustomRequest extends Request {
    user?: {
        username: string;
        role: Role;
    };
}

export const checkAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ message: 'Forbidden: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            username: string;
            role: Role;
        };
        req.user = decoded;

        if (decoded.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: Admins only' });
        }
    } catch (error) {
        res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};
