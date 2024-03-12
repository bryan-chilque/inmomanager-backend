import { RegisterUserDto, LoginUserDto } from '../dtos/auth';
import { UserEntity } from '../entities';

export abstract class AuthRepository {
    abstract registerAdmin( registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract loginUser( loginUserDto: LoginUserDto): Promise<UserEntity>;
}