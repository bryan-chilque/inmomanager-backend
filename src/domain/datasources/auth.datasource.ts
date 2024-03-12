import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { UserEntity } from '../entities';

export abstract class AuthDataSource {
    abstract registerAdmin( registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract loginUser( loginUserDto: LoginUserDto): Promise<UserEntity>;
}