import { regularExps } from "../../../config";

export class RegisterAgentDto {
    private constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
    ) { }

    static create(obj: { [key: string]: any }): [string?, RegisterAgentDto?] {
        const { firstName, lastName, password, email } = obj;

        if (!firstName) return ['First name is required'];
        if (!lastName) return ['Last name is required'];
        if (!email) throw 'User email is required';
        if (!regularExps.email.test(email)) throw 'Invalid email format';
        if (!password) throw 'User password is required';
        if (password.length < 6) throw 'Password must be at least 6 characters long';

        return [undefined, new RegisterAgentDto(firstName, lastName, email, password)];
    }
}