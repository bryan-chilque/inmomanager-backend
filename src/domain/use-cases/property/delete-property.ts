import { PropertyEntity } from '../../entities/property.entity';
import { PropertyRepository } from '../../repositories/property.repository';

export interface DeletePropertyUseCase {
     execute(id: string): Promise<PropertyEntity>;
}

export class DeleteProperty implements DeletePropertyUseCase {

    constructor(
        private readonly repository: PropertyRepository
    ) { }

    execute(id: string): Promise<PropertyEntity> {
        return this.repository.deleteById(id);
    }

}