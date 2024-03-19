import { AgentDataSource } from '../../domain/datasources';
import { AgentRepository } from '../../domain/repositories';
import { AgentEntity } from '../../domain/entities';
import { CreateAgentDto, UpdateAgentDto } from '../../domain/dtos';

export class AgentRepositoryImpl implements AgentRepository {

    constructor(
        private readonly datasource: AgentDataSource
    ) { }

    create(createAgentDto: CreateAgentDto): Promise<AgentEntity> {
        return this.datasource.create(createAgentDto);
    }

    getById(id: string): Promise<AgentEntity> {
        return this.datasource.getById(id);
    }

    getAll(): Promise<AgentEntity[]> {
        return this.datasource.getAll();
    }

    updateById(updateAgentDto: UpdateAgentDto): Promise<AgentEntity> {
        return this.datasource.updateById(updateAgentDto);
    }
    
    deleteById(id: string): Promise<AgentEntity> {
        return this.datasource.deleteById(id);
    }

}