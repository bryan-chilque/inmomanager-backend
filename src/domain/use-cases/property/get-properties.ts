import { PropertyEntity } from '../../entities/property.entity';
import { PropertyRepository } from '../../repositories/property.repository';

export interface GetPropertiesUseCase {
    execute(): Promise<PropertyEntity[]>;
}

export class GetProperties implements GetPropertiesUseCase {

    constructor(
        private readonly repository: PropertyRepository
    ) { }

    execute(): Promise<PropertyEntity[]> {
        return this.repository.getAll();
    }

}