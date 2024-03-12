import { CustomError } from "../errors";

export class PropertyEntity {
    constructor(
        public id: string,
        public code: string,
        public title: string,
        public description: string,
        public address: string,
        public price: number,
        public districtId: string,
        public agentId: string,
    ) { }

    public static fromObject(obj: {[ key: string]: any }): PropertyEntity {
        const { code, title, description, address, price, districtId, agentId } = obj;
        if ( !code ) throw CustomError.badRequest('Code property is required');
        if ( !title ) throw CustomError.badRequest('Title property is required');
        if ( !description ) throw CustomError.badRequest('Description property is required');
        if ( !address ) throw CustomError.badRequest('Address property is required');
        if ( !price ) throw CustomError.badRequest('Price property is required');
        if ( isNaN(price) ) throw CustomError.badRequest('Price property must be a number');
        if ( !districtId ) throw CustomError.badRequest('DistrictId is required');
        if ( !agentId ) throw CustomError.badRequest('AgentId is required');

        return new PropertyEntity(
            obj.id,
            code,
            title,
            description,
            address,
            price,
            districtId,
            agentId
        );
    }
}