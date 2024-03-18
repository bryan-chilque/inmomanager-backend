import { NextFunction, Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserEntity } from "../../domain/entities";

export class AuthMiddleware {
    static async validateJWT( req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;
        if (!authorization) return res.status(401).json({ message: 'No token provided' });
        if ( !authorization.startsWith('Bearer')) {
            return res.status(401).json({ message: 'Invalid Bearer' });
        }

        const token = authorization.split(' ')[1] || '';

        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if (!payload) return res.status(401).json({ message: 'Invalid token' });
            //TODO: implementar error: sesion caducada
            const user = await prisma.user.findUnique({ where: { id: payload.id } });
            if (!user) return res.status(401).json({ message: 'User not found' });
            ////TODO: implementar active user
            req.body.user = UserEntity.fromObject(user);
            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}