import { UpdatePropertyDto } from '../../dtos';
import { PropertyEntity } from '../../entities';
import { PropertyRepository } from '../../repositories';

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