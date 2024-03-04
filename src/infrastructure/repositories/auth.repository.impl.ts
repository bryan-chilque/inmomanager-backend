import { LoginUserDto, RegisterAgentDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { AuthDataSource } from "../../domain/datasources";
import { AuthRepository } from "../../domain/repositories";

export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        private readonly datasource: AuthDataSource,
    ) {}

    registerAgent(registerUserDto: RegisterAgentDto): Promise<object> {
        return this.datasource.registerAgent(registerUserDto);
    }

    loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.datasource.loginUser(loginUserDto);
    }

}