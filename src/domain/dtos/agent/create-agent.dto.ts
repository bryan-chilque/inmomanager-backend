import { UploadedFile } from "express-fileupload";
import { regularExps } from "../../../config";

export class CreateAgentDto {
    private constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly phone: string,
        public readonly email: string,
        public readonly experienceSince: number,
        public readonly avatar: UploadedFile
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateAgentDto?] {
        const { firstName, lastName, phone, email } = props;
        if (!firstName) return ['First name is required'];
        if (!lastName) return ['Last name is required'];
        if (!phone) return ['Phone is required'];
        if (!email) return ['Email is required'];
        if (!regularExps.email.test(email)) return ['Invalid email format'];

        if (!props.experienceSince) return ['Experience since is required'];
        const experienceSince = parseInt(props.experienceSince);
        if (experienceSince < 1990 || experienceSince > 2024) {
            return ['Experience since must be between 1990 and 2024', undefined];
          }

        const avatar = props.file[0] as UploadedFile;
        const validExtension = ['jpg', 'jpeg', 'png']  
        const fileExtension = avatar.mimetype.split('/')[1] ?? '';
        
        if ( !validExtension.includes(fileExtension) ) {
            return[`Invalid file extension: ${fileExtension}, valid extensions are: ${validExtension.join(', ')}.`];
        }  

        if (avatar.size > 5000000) {
            return ['File size must be less than 5MB'];
        }

        return [undefined, new CreateAgentDto(firstName, lastName, phone, email, experienceSince, avatar)]
    }
}