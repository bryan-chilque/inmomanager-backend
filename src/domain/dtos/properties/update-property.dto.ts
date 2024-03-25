import { UploadedFile } from "express-fileupload";

export class UpdatePropertyDto{

    private constructor (
        public readonly id: string,
        public readonly code?: string,
        public readonly title?: string,
        public readonly description?: string,
        public readonly address?: string,
        public readonly price?: number,
        public readonly images?: UploadedFile[],
        public readonly districtId?: string
    ){}

    get values(){
        const returnObject: {[key: string]: any} = {};
        if ( this.code ) returnObject.code = this.code;
        if ( this.title ) returnObject.title = this.title;
        if ( this.description ) returnObject.description = this.description;
        if ( this.address ) returnObject.address = this.address;
        if ( this.price ) returnObject.price = this.price;
        if ( this.images ) returnObject.images = this.images;
        if ( this.districtId ) returnObject.districtId = this.districtId;
        return returnObject;
    }

    static create(props: {[key: string]: any}): [string?, UpdatePropertyDto?] {
        const { id, code, title, description, address, price, districtId } = props;
        if ( !id ) return ['Id property is required!'];
        if ( isNaN(price) ) return ['Price property must be a number!'];
        let images;
        if ( props.file ) {
            images = props.file as UploadedFile[]
            const validExtension = ['jpg', 'jpeg', 'png']
            for ( const image of images ) {
                const fileExtension = image.mimetype.split('/')[1] ?? '';
                if ( !validExtension.includes(fileExtension) ) {
                    return [`Invalid file extension: ${fileExtension}, valid extensions are: ${validExtension.join(', ')}.`];
                }
                if (image.size > 5000000) return [`File size must be less than ${ 5000000 / 1000000 }MB`];
            }
        }

        return [undefined, new UpdatePropertyDto(id, code, title, description, address, price, districtId)]
    }
}