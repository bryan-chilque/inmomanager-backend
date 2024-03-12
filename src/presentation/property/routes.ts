import { Router } from "express";
import { PropertyController } from "./controller";
import { PropertyDataSourceImpl } from "../../infrastructure/datasources";
import { PropertyRepositoryImpl } from "../../infrastructure/repositories";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class PropertyRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new PropertyDataSourceImpl();
        const propertyRepository = new PropertyRepositoryImpl(datasource);
        const propertyController = new PropertyController(propertyRepository);

        router.get('/', propertyController.getProperties );
        router.get('/:id', propertyController.getPropertyById );
        
        router.post('/', [ AuthMiddleware.validateJWT ], propertyController.createProperty );
        router.put('/:id', [ AuthMiddleware.validateJWT ], propertyController.updateProperty );
        router.delete('/:id', [ AuthMiddleware.validateJWT ], propertyController.deleteProperty );

        return router;
    }
}
