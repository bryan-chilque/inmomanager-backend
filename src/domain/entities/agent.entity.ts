import { CustomError } from "../errors";

export class AgentEntity {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public phone: string,
        public email: string,
        public experienceSince: number,
        public avatar?: string
    ) { }
    static fromObject( obj: { [key:string]: any } ) {
        const { firstName, lastName, phone, email, experienceSince } = obj;
        if ( !firstName ) throw CustomError.badRequest('Agent first name is required');
        if ( !lastName ) throw CustomError.badRequest('Agent last name is required');
        if ( !phone ) throw CustomError.badRequest('Agent phone is required');
        if ( !email ) throw CustomError.badRequest('Agent email is required');
        if ( !experienceSince ) throw CustomError.badRequest('Agent experience since is required');

        return new AgentEntity(
            obj.id,
            firstName,
            lastName,
            phone,
            email,
            experienceSince,
            obj.avatar
        );
    }
}