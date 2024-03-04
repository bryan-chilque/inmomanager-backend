
export class LoginUserDto {
    private constructor(
        public email: string,
        public password: string,
    ) { }

    static create(obj: { [key: string]: any }): [string?, LoginUserDto?] {
        const { email, password } = obj;

        if (!email) return ['User email is required'];
        if (!password) return ['User password is required'];

        return [undefined, new LoginUserDto(email, password)];
    }
}