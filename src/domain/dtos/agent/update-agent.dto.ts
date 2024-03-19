import { UploadedFile } from "express-fileupload";
import { regularExps } from "../../../config";
import { parse } from "dotenv";

export class UpdateAgentDto{

    private constructor (
        public readonly id: string,
        public readonly firstName?: string,
        public readonly lastName?: string,
        public readonly phone?: string,
        public readonly email?: string,
        public readonly experienceSince?: number,
        public readonly avatar?: UploadedFile
    ){}

    get values(){
        const returnObject: {[key: string]: any} = {};
        if ( this.firstName ) returnObject.firstName = this.firstName;
        if ( this.lastName ) returnObject.lastName = this.lastName;
        if ( this.phone ) returnObject.phone = this.phone;
        if ( this.email ) returnObject.email = this.email;
        if ( this.experienceSince ) returnObject.experienceSince = this.experienceSince;
        if ( this.avatar ) returnObject.avatar = this.avatar;
        return returnObject;
    }

    static create(props: {[key: string]: any}): [string?, UpdateAgentDto?] {
        const { id, firstName, lastName, email, phone } = props;
        if ( !id ) return ['Id agent is required!'];
        if ( phone && !regularExps.phone.test(phone) ) return ['Invalid phone format'];
        if ( email && !regularExps.email.test(email) ) return ['Invalid email format'];
        let experienceSince;
        if (props.experienceSince) {
            experienceSince = parseInt(props.experienceSince);
            if (Number.isNaN(experienceSince)) return ['Experience since must be a number'];
            if (experienceSince < 1990 || experienceSince > 2024) {
                return ['Experience since must be between 1990 and 2024'];
            }
        }
        let avatar;
        if (props.file) {
            avatar = props.file[0] as UploadedFile 
            const validExtension = ['jpg', 'jpeg', 'png']  
            const fileExtension = avatar.mimetype.split('/')[1] ?? '';
            
            if ( !validExtension.includes(fileExtension) ) {
                return[`Invalid file extension: ${fileExtension}, valid extensions are: ${validExtension.join(', ')}.`];
            }  
    
            if (avatar.size > 5000000) {
                return ['File size must be less than 5MB'];
            }
        }
        return [undefined, new UpdateAgentDto(id, firstName, lastName, phone, email, experienceSince, avatar)]
    }
}