import { UpdatePropertyDto } from '../../dtos/properties/update-property.dto';
import { PropertyEntity } from '../../entities/property.entity';
import { PropertyRepository } from '../../repositories/property.repository';

export interface UpdatePropertyUseCase {
     execute(dto: UpdatePropertyDto): Promise<PropertyEntity>;
}

export class UpdateProperty implements UpdatePropertyUseCase {

    constructor(
        private readonly repository: PropertyRepository
    ) { }

    execute(dto: UpdatePropertyDto): Promise<PropertyEntity> {
        return this.repository.updateById(dto);
    }

}