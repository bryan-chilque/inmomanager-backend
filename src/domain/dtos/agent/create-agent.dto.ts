import { UploadedFile } from "express-fileupload";
import { regularExps, isValidExtension, isValidSize, MAX_FILE_SIZE, VALID_EXTENSIONS } from "../../../config";

export class CreateAgentDto {
    private constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly phone: string,
        public readonly email: string,
        public readonly experienceSince: number,
        public readonly avatar?: UploadedFile
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateAgentDto?] {
        const { firstName, lastName, phone, email } = props;
        if (!firstName) return ['First name is required'];
        if (!lastName) return ['Last name is required'];
        if (!phone) return ['Phone is required'];
        if (!regularExps.phone.test(phone)) return ['Invalid phone format'];
        if (!email) return ['Email is required'];
        if (!regularExps.email.test(email)) return ['Invalid email format'];
        let experienceSince
        if (!props.experienceSince) return ['Experience since is required'];
        else {
            experienceSince = parseInt(props.experienceSince);
            if (Number.isNaN(experienceSince)) return ['Experience since must be a number'];
            if (experienceSince < 1990 || experienceSince > 2024) {
                return ['Experience since must be between 1990 and 2024', undefined];
            }
        }
        let avatar
        if (props.file) {
            avatar = props.file[0] as UploadedFile 
            const fileExtension = avatar.mimetype.split('/')[1] ?? '';
            
            if (!isValidExtension(fileExtension)) {
                return [`Invalid file extension: ${fileExtension}, valid extensions are: ${VALID_EXTENSIONS.join(', ')}.`];
            }
            if (!isValidSize(avatar.size)) {
                return [`File size must be less than ${MAX_FILE_SIZE / 1000000}MB`];
            }
        }

        return [undefined, new CreateAgentDto(firstName, lastName, phone, email, experienceSince, avatar)]
    }
}