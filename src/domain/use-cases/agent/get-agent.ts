import { AgentEntity } from "../../entities";
import { AgentRepository } from "../../repositories";


export interface GetAgentUseCase {
    execute(id: string): Promise<AgentEntity>;
}


export class GetAgent implements GetAgentUseCase {
    constructor(
        private readonly repository: AgentRepository
    ) { }

    execute(id: string): Promise<AgentEntity> {
        return this.repository.getAgentById(id);
    }
}