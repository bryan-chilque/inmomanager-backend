import { CustomError } from "../errors";

export class AgentEntity {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public token?: string
    ) { }
    static fromObject( obj: { [key:string]: any } ) {
        const { firstName, lastName, email } = obj;
        if ( !firstName ) throw CustomError.badRequest('Agent first name is required');
        if ( !lastName ) throw CustomError.badRequest('Agent last name is required');
        if ( !email ) throw CustomError.badRequest('Agent email is required');

        return new AgentEntity(
            obj.id,
            firstName,
            lastName,
            email,
        );
    }
}