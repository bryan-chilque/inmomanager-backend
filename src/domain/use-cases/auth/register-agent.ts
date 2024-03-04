import { RegisterAgentDto } from "../../dtos";
import { AuthRepository } from "../../repositories";

export interface RegisterAgentUseCase {
    execute(dto: RegisterAgentDto): Promise<object>;
}

export class RegisterAgent implements RegisterAgentUseCase {
        constructor(
            private readonly repository: AuthRepository
        ) { }
    
        execute(dto: RegisterAgentDto): Promise<object> {
            return this.repository.registerAgent(dto);
        }
    
    }