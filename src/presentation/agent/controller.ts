import { Request, Response } from "express";
import { CustomError } from "../../domain/errors";
import { AgentRepository } from "../../domain/repositories";
import { CreateAgentDto, UpdateAgentDto } from "../../domain/dtos";
import { CreateAgent, GetAgents, GetAgent, DeleteAgent } from "../../domain/use-cases";
import { UpdateAgent } from '../../domain/use-cases/agent/update-agent';

export class AgentController {
    constructor(
        public readonly agentRepository: AgentRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' })
    }

    public createAgent = (req: Request, res: Response) => {
        const [error, createAgentDto] = CreateAgentDto.create(req.body);
        if (error) return res.status(400).json({ error });
        new CreateAgent(this.agentRepository)
            .execute(createAgentDto!)
            .then(agent => res.json(agent))
            .catch(error => this.handleError(error, res));
    }

    public getAgentById = (req: Request, res: Response) => {
        const id = req.params.id;
        new GetAgent(this.agentRepository)
            .execute(id)
            .then(agent => res.json(agent))
            .catch(error => this.handleError(error, res));
    }

    public getAgents = (req: Request, res: Response) => {
        new GetAgents(this.agentRepository)
            .execute()
            .then(agents => res.json(agents))
            .catch(error => this.handleError(error, res));
    }

    public updateAgent = (req: Request, res: Response) => {
        const id = req.params.id;
        const [error, updateAgentDto] = UpdateAgentDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });
        new UpdateAgent(this.agentRepository)
            .execute(updateAgentDto!)
            .then(agent => res.json(agent))
            .catch(error => this.handleError(error, res));
    }

    public deleteAgent = (req: Request, res: Response) => {
        const id = req.params.id;
        new DeleteAgent(this.agentRepository)
            .execute(id)
            .then(agent => res.json(agent))
            .catch(error => this.handleError(error, res));
    }
}