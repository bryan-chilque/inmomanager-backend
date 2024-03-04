import { Router } from "express";
import { PropertyController } from "./controller";
import { PropertyDataSourceImpl } from "../../infrastructure/datasources/property.datasource.impl";
import { PropertyRepositoryImpl } from "../../infrastructure/repositories/property.repository.impl";

export class PropertyRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new PropertyDataSourceImpl();
        const propertyRepository = new PropertyRepositoryImpl(datasource);
        const propertyController = new PropertyController(propertyRepository);

        router.get('/', propertyController.getProperties );
        router.get('/:id', propertyController.getPropertyById );
        
        router.post('/', propertyController.createProperty );
        router.put('/:id', propertyController.updateProperty );
        router.delete('/:id', propertyController.deleteProperty );

        return router;
    }
}
