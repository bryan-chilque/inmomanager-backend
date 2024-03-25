import { UploadedFile } from "express-fileupload";
import { isValidExtension, isValidSize, MAX_FILE_SIZE, VALID_EXTENSIONS } from "../../../config";

export class CreatePropertyDto {

    private constructor(
        public readonly code: string,
        public readonly title: string,
        public readonly description: string,
        public readonly address: string,
        public readonly price: number,
        public readonly images: UploadedFile[] | undefined,
        public readonly districtId: string,
        public readonly agentId: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreatePropertyDto?] {
        const { code, title, description, address, price, districtId, agentId } = props;
        if (!code) return ['code property is required'];
        if (!title) return ['title property is required'];
        if (!description) return ['description property is required'];
        if (!address) return ['address property is required'];
        if (!price) return ['price property is required'];
        if (isNaN(price)) return ['price property must be a number'];
        if (!districtId) return ['districtId is required'];
        if (!agentId) return ['agentId is required'];
        let images
        if (props.file) {
            images = props.file as UploadedFile[]
            for (const image of images) {
                const fileExtension = image.mimetype.split('/')[1] ?? '';
                if (!isValidExtension(fileExtension)) {
                    return [`Invalid file extension: ${fileExtension}, valid extensions are: ${VALID_EXTENSIONS.join(', ')}.`];
                }
                if (!isValidSize(image.size)) {
                    return [`File size must be less than ${MAX_FILE_SIZE / 1000000}MB`];
                }
            }
        }

        return [undefined, new CreatePropertyDto(code, title, description, address, price, images, districtId, agentId)]
    }
}