import { CreateAgentDto, UpdateAgentDto } from "../dtos";
import { AgentEntity } from "../entities";

export abstract class AgentRepository {
    abstract create(createAgentDto: CreateAgentDto): Promise<AgentEntity>;
    abstract getById(id: string): Promise<AgentEntity>;
    abstract getAll(): Promise<AgentEntity[]>;
    abstract updateById(agent: UpdateAgentDto): Promise<AgentEntity>;
    abstract deleteById(id: string): Promise<AgentEntity>;
}