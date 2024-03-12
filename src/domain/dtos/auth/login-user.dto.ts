import { regularExps } from "../../../config";

export class LoginUserDto {
    private constructor(
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create(obj: { [key: string]: any }): [string?, LoginUserDto?] {
        const { email, password } = obj;

        if (!email) return ['User email is required'];
        if ( !regularExps.email.test( email ) ) return ['Email is not valid'];
        if (!password) return ['User password is required'];

        return [undefined, new LoginUserDto(email, password)];
    }
}