import { CreateAgentDto } from "../dtos/agent/create-agent.dto";
import { AgentEntity } from "../entities";

export abstract class AgentRepository {
    abstract createAgent(createAgentDto: CreateAgentDto): Promise<AgentEntity>;
    abstract getAgentById(id: string): Promise<AgentEntity>;
    abstract getAgents(): Promise<AgentEntity[]>;
    //abstract updateAgent(agent: UpdateAgentDto): Promise<AgentEntity>;
    abstract deleteAgent(id: string): Promise<AgentEntity>;
}