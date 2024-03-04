import jwt from 'jsonwebtoken';   
import { envs } from './envs';

const JWT_SECRET = envs.JWT_SECRET;

export class JwtAdapter {
    static async generateToken(payload: any, duration: string = '2h') {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
                if (err) resolve(null);
                resolve(token);
            });
        });
    }
    static verifyToken(token: string) {
        throw new Error('Method not implemented.');
    }
}