import { regularExps } from "../../../config";

export class CreateAgentDto {
    private constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly phone: string,
        public readonly email: string,
        public readonly experienceSince: number,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateAgentDto?] {
        const { firstName, lastName, phone, email, experienceSince } = props;
        if (!firstName) return ['First name is required'];
        if (!lastName) return ['Last name is required'];
        if (!phone) return ['Phone is required'];
        if (!email) return ['Email is required'];
        if (!regularExps.email.test(email)) return ['Invalid email format'];
        if (!experienceSince) return ['Experience since is required'];
        if (experienceSince < 1990 || experienceSince > 2024) {
            return ['Experience since must be between 1990 and 2024', undefined];
          }
        return [undefined, new CreateAgentDto(firstName, lastName, phone, email, experienceSince)]
    }
}