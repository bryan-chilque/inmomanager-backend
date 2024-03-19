import { AgentEntity } from "../../entities";
import { AgentRepository } from "../../repositories";

export interface GetAgentsUseCase {
    execute(): Promise<AgentEntity[]>;
}

export class GetAgents implements GetAgentsUseCase {

    constructor(
        private readonly repository: AgentRepository
    ) { }

    execute(): Promise<AgentEntity[]> {
        return this.repository.getAll();
    }

}