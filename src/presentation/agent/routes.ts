import { Router } from "express";
import { AgentController } from "./controller";
import { AgentDataSourceImpl } from "../../infrastructure/datasources";
import { AgentRepositoryImpl } from "../../infrastructure/repositories";
import { AuthMiddleware, FileUploadMiddleware } from "../middlewares";

export class AgentRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new AgentDataSourceImpl();
        const agentRepository = new AgentRepositoryImpl(datasource);
        const controller = new AgentController(agentRepository);

        router.post('/', [ AuthMiddleware.validateJWT, FileUploadMiddleware.containFile ], controller.createAgent);
        router.get('/:id', controller.getAgentById);
        router.get('/', controller.getAgents);
        router.put('/:id', [ AuthMiddleware.validateJWT, FileUploadMiddleware.containFile ], controller.updateAgent);
        router.delete('/:id', AuthMiddleware.validateJWT, controller.deleteAgent);
        return router;
    }
}