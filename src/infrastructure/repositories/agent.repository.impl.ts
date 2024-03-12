import { AgentDataSource } from '../../domain/datasources';
import { AgentRepository } from '../../domain/repositories/agent.repository';
import { AgentEntity } from '../../domain/entities';
import { CreateAgentDto } from '../../domain/dtos';
export class AgentRepositoryImpl implements AgentRepository {
    constructor(
        private readonly datasource: AgentDataSource
    ) { }
    createAgent(createAgentDto: CreateAgentDto): Promise<AgentEntity> {
        return this.datasource.createAgent(createAgentDto);
    }
    getAgentById(id: string): Promise<AgentEntity> {
        return this.datasource.getAgentById(id);
    }
    getAgents(): Promise<AgentEntity[]> {
        return this.datasource.getAgents();
    }
    deleteAgent(id: string): Promise<AgentEntity> {
        throw new Error('Method not implemented.');
    }

}