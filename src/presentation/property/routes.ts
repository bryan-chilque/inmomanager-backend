import { Router } from "express";
import { PropertyController } from "./controller";

export class PropertyRoutes {
    static get routes(): Router{
        const router = Router();

        const propertyController = new PropertyController();

        router.get('/', propertyController.getProperties );
        router.get('/:id', propertyController.getPropertyById );
        
        //router.post('/', propertyController.cr );
        router.put('/:id', propertyController.updateProperty );
        router.delete('/:id', propertyController.deleteProperty );

        return router;
    }
}
