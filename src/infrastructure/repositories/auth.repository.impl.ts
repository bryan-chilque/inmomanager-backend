import { LoginUserDto, RegisterUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { AuthDataSource } from "../../domain/datasources";
import { AuthRepository } from "../../domain/repositories";

export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        private readonly datasource: AuthDataSource,
    ) {}

    registerAdmin(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.datasource.registerAdmin(registerUserDto);
    }

    loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.datasource.loginUser(loginUserDto);
    }

}