import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl } from "../../infrastructure/datasources";
import { AuthRepositoryImpl } from "../../infrastructure/repositories";
import { AuthMiddleware } from "../middlewares";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new AuthDataSourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);
        const authController = new AuthController(authRepository);

        router.post('/login',  authController.loginUser);
        router.post('/register-user', [ AuthMiddleware.validateJWT ], authController.registerUser);

        return router;
    }
}