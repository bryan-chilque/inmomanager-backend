import { CustomError } from "../errors";

export class UserEntity {
    constructor(
        public id: string,
        public fistName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public role: string,
        public token?: any
    ) { }
    static fromObject( obj: { [key:string]: any } ) {
        const { id, firstName, lastName, email, password, role } = obj;
        if ( !id ) throw CustomError.badRequest('User id is required');
        if ( !firstName ) throw CustomError.badRequest('User first name is required');
        if ( !lastName ) throw CustomError.badRequest('User last name is required');
        if ( !email ) throw CustomError.badRequest('User email is required');
        if ( !password ) throw CustomError.badRequest('User password is required');
        if ( !role ) throw CustomError.badRequest('User role is required');
        return new UserEntity(
            id,
            firstName,
            lastName,
            email,
            password,
            role,
            obj.token,
        );
    }
}