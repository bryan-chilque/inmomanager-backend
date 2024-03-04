import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl } from "../../infrastructure/datasources/auth.datasource.impl";
import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth.repository.impl";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new AuthDataSourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);
        const authController = new AuthController(authRepository);

        router.post('/login',  authController.loginUser);
        router.post('/register', authController.registerAgent);

        return router;
    }
}