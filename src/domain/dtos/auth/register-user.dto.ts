import { regularExps } from "../../../config";

export class RegisterUserDto {
    private constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create(obj: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { firstName, lastName, password, email } = obj;

        if (!firstName) return ['First name is required'];
        if (!lastName) return ['Last name is required'];
        if (!email) return ['User email is required'];
        if (!regularExps.email.test(email)) return ['Invalid email format'];
        if (!password) return ['User password is required'];
        if (password.length < 6) return ['Password must be at least 6 characters long'];

        return [undefined, new RegisterUserDto(firstName, lastName, email, password)];
    }
}