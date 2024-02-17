import { Router } from "express";
import { UbigeoRoutes } from "./ubigeo/routes";
import { PropertyRoutes } from "./property/routes";

export class AppRoutes {
    static get routes(): Router{
        const router = Router();
        
        router.use('/api/ubigeo', UbigeoRoutes.routes);
        router.use('/api/property', PropertyRoutes.routes);

        return router;
    }
}
