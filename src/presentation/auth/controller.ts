import e, { Request, Response } from "express";
import { RegisterAgent, LoginUser } from '../../domain/use-cases';
import { AuthRepository } from '../../domain/repositories';
import { LoginUserDto, RegisterAgentDto } from "../../domain/dtos";
import { CustomError } from "../../domain/errors";

export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository
    ) { }

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError){
            res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }

    public registerAgent = (req: Request, res: Response) => {
        const [error, registerAgentDto] = RegisterAgentDto.create(req.body);
        if (error) return res.status(400).json({ error });
        new RegisterAgent(this.authRepository)
            .execute(registerAgentDto!)
            .then(agent => res.json(agent))
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