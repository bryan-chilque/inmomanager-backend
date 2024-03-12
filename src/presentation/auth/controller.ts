import { Request, Response } from "express";
import { RegisterUser, LoginUser } from '../../domain/use-cases';
import { AuthRepository } from '../../domain/repositories';
import { LoginUserDto, RegisterUserDto } from "../../domain/dtos";
import { CustomError } from "../../domain/errors";

export class AuthController {
    constructor(
        public readonly authRepository: AuthRepository
    ) {}

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError){
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' });
    }

    public registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });
        new RegisterUser(this.authRepository)
            .execute(registerUserDto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    public loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error });
        new LoginUser(this.authRepository)
            .execute(loginUserDto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }
}