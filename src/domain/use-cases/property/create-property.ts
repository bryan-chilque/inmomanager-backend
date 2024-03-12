import { CreatePropertyDto } from '../../dtos/properties/create-property.dto';
import { PropertyEntity, UserEntity } from '../../entities';
import { PropertyRepository } from '../../repositories';

export interface CreatePropertyUseCase {
     execute(dto: CreatePropertyDto): Promise<PropertyEntity>;
}

export class CreateProperty implements CreatePropertyUseCase {

    constructor(
        private readonly repository: PropertyRepository
    ) { }

    execute(dto: CreatePropertyDto): Promise<PropertyEntity> {
        return this.repository.create(dto);
    }

}