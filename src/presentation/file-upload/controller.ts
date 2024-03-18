import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { CustomError } from "../../domain/errors";
import { FileRepository } from "../../domain/repositories";
import { UploadSingleFile, UploadMultipleFile } from "../../domain/use-cases";


export class FileUploadController {
    constructor(
        private readonly fileRepository: FileRepository
    ) {}

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError){
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' });
    }

    public uploadSingleFile = (req: Request, res: Response) => { 
        const type = req.params.type;
        const file = req.body.file[0] as UploadedFile;
        const validExtensions = ['jpg', 'jpeg', 'png']

        new UploadSingleFile(this.fileRepository)
        .execute(file, `uploads/${type}`, validExtensions)
        .then( uploaded => res.json( uploaded ))
        .catch(error => this.handleError(error, res));
    }

    public uploadMultipleFiles = (req: Request, res: Response) => {
        const type = req.params.type;
        const files = req.body.file as UploadedFile[];
        const validExtensions = ['jpg', 'jpeg', 'png']

        new UploadMultipleFile(this.fileRepository)
        .execute(files, `uploads/${type}`, validExtensions)
        .then( uploaded => res.json( uploaded ))
        .catch(error => this.handleError(error, res));
    }
}