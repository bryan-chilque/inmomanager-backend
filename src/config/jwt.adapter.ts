import jwt from 'jsonwebtoken';   
import { envs } from './envs.adapter';

const JWT_SECRET = envs.JWT_SECRET;

export class JwtAdapter {
    static async generateToken(payload: any, duration: string = '12h') {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
                if (err) resolve(null);
                resolve(token);
            });
        });
    }
    static validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) resolve(null);
                resolve(decoded as T);
            });
        });
    }
}