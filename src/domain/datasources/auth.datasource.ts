import { AgentEntity } from '../entities/agent.entity';
import { RegisterAgentDto } from '../dtos/auth/register-agent.dto';
import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthDataSource {
    abstract registerAgent( registerUserDto: RegisterAgentDto): Promise<object>;
    abstract loginUser( loginUserDto: LoginUserDto): Promise<UserEntity>;
}