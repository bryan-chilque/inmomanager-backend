export class CreatePropertyDto{

    private constructor (
        public readonly code: string,
        public readonly title: string,
        public readonly description: string,
        public readonly address: string,
        public readonly price: number,
        public readonly districtId: string
    ){}

    static create(props: {[key: string]: any}): [string?, CreatePropertyDto?] {
        const { code, title, description, address, price, districtId } = props;
        if ( !code ) return ['Code property is required'];
        if ( !title ) return ['Title property is required'];
        if ( !description ) return ['Description property is required'];
        if ( !address ) return ['Address property is required'];
        if ( !price ) return ['Price property is required'];
        if ( isNaN(price) ) return ['Price property must be a number'];
        if ( !districtId ) return ['DistrictId is required'];
        return [undefined, new CreatePropertyDto(code, title, description, address, price, districtId)]
    }
}