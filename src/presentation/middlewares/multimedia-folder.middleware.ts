import { NextFunction, Request, Response } from "express";

export class MultimediaFolderMiddleware {
    static validFolderName (validTypes: string[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            const type = req.url.split('/')[2] ?? '';
            if ( !validTypes.includes(type) ) {
                return res.status(400).json({ error: `Invalid type: ${type}, valid types are: ${validTypes.join(', ')}.` });
            }
            next();
        }
    }
}