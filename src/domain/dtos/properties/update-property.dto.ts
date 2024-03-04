export class UpdatePropertyDto{

    private constructor (
        public readonly id: string,
        public readonly code?: string,
        public readonly title?: string,
        public readonly description?: string,
        public readonly address?: string,
        public readonly price?: number,
        public readonly districtId?: string
    ){}

    get values(){
        const returnObject: {[key: string]: any} = {};
        if ( this.code ) returnObject.code = this.code;
        if ( this.title ) returnObject.title = this.title;
        if ( this.description ) returnObject.description = this.description;
        if ( this.address ) returnObject.address = this.address;
        if ( this.price ) returnObject.price = this.price;
        if ( this.districtId ) returnObject.districtId = this.districtId;
        return returnObject;
    }

    static create(props: {[key: string]: any}): [string?, UpdatePropertyDto?] {
        const { id, code, title, description, address, price, districtId } = props;
        if ( !id ) return ['Id property is required!', undefined];
        return [undefined, new UpdatePropertyDto(id, code, title, description, address, price, districtId)]
    }
}