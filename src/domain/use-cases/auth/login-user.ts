import { LoginUserDto } from "../../dtos";
import { AuthRepository } from "../../repositories";
import { UserEntity } from '../../entities/user.entity';

export interface LoginUserUseCase {
    execute(dto: LoginUserDto): Promise<UserEntity>;
}

export class LoginUser implements LoginUserUseCase {
        constructor(
            private readonly repository: AuthRepository
        ) { }
    
        execute(dto: LoginUserDto): Promise<UserEntity> {
            return this.repository.loginUser(dto);
        }
    
    }