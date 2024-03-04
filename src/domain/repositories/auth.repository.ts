import { RegisterAgentDto, LoginUserDto } from '../dtos/auth';
import { UserEntity } from '../entities';

export abstract class AuthRepository {
    abstract registerAgent( registerUserDto: RegisterAgentDto): Promise<object>;
    abstract loginUser( loginUserDto: LoginUserDto): Promise<UserEntity>;
}