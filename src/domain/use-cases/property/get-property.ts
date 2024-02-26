import { PropertyEntity } from '../../entities/property.entity';
import { PropertyRepository } from '../../repositories/property.repository';

export interface GetPropertyUseCase {
    execute(id: string): Promise<PropertyEntity>;
}

export class GetProperty implements GetPropertyUseCase {

    constructor(
        private readonly repository: PropertyRepository
    ) { }

    execute(id: string): Promise<PropertyEntity> {
        return this.repository.getById(id);
    }

}