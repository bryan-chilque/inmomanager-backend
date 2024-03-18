import { Router } from "express";
import { FileUploadController } from './controller';
import { AuthMiddleware, FileUploadMiddleware, MultimediaFolderMiddleware } from "../middlewares";
import { FileRepositoryImpl } from "../../infrastructure/repositories";
import { FileDataSourceImpl } from "../../infrastructure/datasources";

export class FileUploadRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new FileDataSourceImpl();
        const fileRepository = new FileRepositoryImpl(datasource);
        const fileUploadController = new FileUploadController(fileRepository);

        router.use(AuthMiddleware.validateJWT, FileUploadMiddleware.containFile);
        router.use(MultimediaFolderMiddleware.validFolderName(['agents', 'properties']));

        router.post('/single/:type', fileUploadController.uploadSingleFile);
        router.post('/multiple/:type', fileUploadController.uploadMultipleFiles);
        
        return router;
    }
}