export class PropertyEntity {
    constructor(
        public id: string,
        public code: string,
        public title: string,
        public description: string,
        public address: string,
        public price: number|null,
        public districtId: string
    ) { }

    public static fromObject(obj: {[ key: string]: any }): PropertyEntity {
        const { code, title, description, address, price, districtId } = obj;
        if ( !code ) throw 'Code property is required';
        if ( !title ) throw 'Title property is required';
        if ( !description ) throw 'Description property is required';
        if ( !address ) throw 'Address property is required';
        if ( !price ) throw 'Price property is required';
        if ( isNaN(price) ) throw 'Price property must be a number';
        if ( !districtId ) throw 'DistrictId is required';

        return new PropertyEntity(
            obj.id,
            code,
            title,
            description,
            address,
            price,
            districtId
        );
    }
}