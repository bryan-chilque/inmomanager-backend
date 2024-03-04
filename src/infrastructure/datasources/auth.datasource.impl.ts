import { prisma } from '../../data/postgres/index';

import { LoginUserDto, RegisterAgentDto } from '../../domain/dtos';
import { AuthDataSource } from '../../domain/datasources';
import { CustomError } from "../../domain/errors";
import { JwtAdapter, bcryptAdapter } from '../../config';
import { UserEntity } from '../../domain';
import jwt from 'jsonwebtoken';

export class AuthDataSourceImpl implements AuthDataSource{

    async registerAgent( registerUserDto: RegisterAgentDto ): Promise<object> {
       const existUser = await prisma.user.findFirst({
            where: { email: registerUserDto.email }
        });
        if ( existUser ) throw CustomError.badRequest('User with email already exists');
        try {
            registerUserDto.password = bcryptAdapter.hash(registerUserDto.password);
            await prisma.agent.create({
                data: {
                    firstName: registerUserDto.firstName!,
                    lastName: registerUserDto.lastName!,
                    user: {
                        create: {
                            email: registerUserDto.email!,
                            password: registerUserDto.password!,
                        }
                    }
                }
            });
            return {message: "Usuario registrado correctamente"};
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
      }

    async loginUser( loginUserDto: LoginUserDto ): Promise<UserEntity> {
        const user = await prisma.user.findFirst({
            where: { email: loginUserDto.email }
        });
        if ( !user ) throw CustomError.badRequest('Email not exists');
        if ( !bcryptAdapter.compare(loginUserDto.password, user.password) ) {
            throw CustomError.badRequest('Password not match');
        }
        user.password = 'password hidden for security reasons';
        const userEntity = UserEntity.fromObject( user );
        userEntity.token = await JwtAdapter.generateToken({ id: user.id, email: user.email });
        if ( !userEntity.token ) throw CustomError.internalServer('Error generating token');
        return userEntity;
    }
}
