import { UpdateAgentDto } from '../../dtos';
import { AgentEntity } from '../../entities';
import { AgentRepository } from '../../repositories';

export interface UpdateAgentUseCase {
     execute(dto: UpdateAgentDto): Promise<AgentEntity>;
}

export class UpdateAgent implements UpdateAgentUseCase {

    constructor(
        private readonly repository: AgentRepository
    ) { }

    execute(dto: UpdateAgentDto): Promise<AgentEntity> {
        return this.repository.updateById(dto);
    }

}