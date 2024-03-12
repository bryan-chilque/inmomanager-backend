import { Router } from "express";
import { UbigeoRoutes } from "./ubigeo/routes";
import { PropertyRoutes } from "./property/routes";
import { AuthRoutes } from "./auth/routes";
import { AgentRoutes } from "./agent/routes";

export class AppRoutes {
    static get routes(): Router{
        const router = Router();
        
        router.use('/api/ubigeo', UbigeoRoutes.routes);
        router.use('/api/agent', AgentRoutes.routes);
        router.use('/api/property', PropertyRoutes.routes);
        router.use('/api/auth', AuthRoutes.routes);
        
        return router;
    }
}
