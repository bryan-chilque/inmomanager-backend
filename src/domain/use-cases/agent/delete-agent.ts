import { AgentEntity } from "../../entities";
import { AgentRepository } from "../../repositories";

export interface DeleteAgentUseCase {
    execute(id: string): Promise<AgentEntity>;
}

export class DeleteAgent implements DeleteAgentUseCase {
    constructor(
        private readonly repository: AgentRepository
    ) { }

    execute(id: string): Promise<AgentEntity> {
        return this.repository.deleteById(id);
    }

}