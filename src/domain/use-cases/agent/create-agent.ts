import { CreateAgentDto } from "../../dtos";
import { AgentEntity } from "../../entities";
import { AgentRepository } from "../../repositories";

export interface CreateAgentUseCase {
    execute(dto: CreateAgentDto): Promise<AgentEntity>;
}

export class CreateAgent implements CreateAgentUseCase {
    constructor(
        private readonly repository: AgentRepository
    ) { }

    execute(dto: CreateAgentDto): Promise<AgentEntity> {
        return this.repository.createAgent(dto);
    }

}