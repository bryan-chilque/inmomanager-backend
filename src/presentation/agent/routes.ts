import { Router } from "express";
import { AgentController } from "./controller";
import { AgentDataSourceImpl } from "../../infrastructure/datasources";
import { AgentRepositoryImpl } from "../../infrastructure/repositories";
import { AuthMiddleware } from "../middlewares";

export class AgentRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new AgentDataSourceImpl();
        const agentRepository = new AgentRepositoryImpl(datasource);
        const controller = new AgentController(agentRepository);

        router.post('/', [ AuthMiddleware.validateJWT ], controller.createAgent);
        router.get('/:id', controller.getAgentById);
        router.get('/', controller.getAgents);

        return router;
    }
}