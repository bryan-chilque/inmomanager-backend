export class CreatePropertyDto {

    private constructor(
        public readonly code: string,
        public readonly title: string,
        public readonly description: string,
        public readonly address: string,
        public readonly price: number,
        public readonly images: string[],
        public readonly districtId: string,
        public readonly agentId: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreatePropertyDto?] {
        const { code, title, description, address, price, images, districtId, agentId } = props;
        if (!code) return ['code property is required'];
        if (!title) return ['title property is required'];
        if (!description) return ['description property is required'];
        if (!address) return ['address property is required'];
        if (!price) return ['price property is required'];
        if (isNaN(price)) return ['price property must be a number'];
        if (!districtId) return ['districtId is required'];
        if (!agentId) return ['agentId is required'];
        return [undefined, new CreatePropertyDto(code, title, description, address, price, images, districtId, agentId)]
    }
}