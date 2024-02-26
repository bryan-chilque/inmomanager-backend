import { CreatePropertyDto, UpdatePropertyDto, PropertyDataSource, PropertyEntity, PropertyRepository } from '../../domain';

export class PropertyRepositoryImpl implements PropertyRepository {

    constructor(
        private readonly datasource: PropertyDataSource,
    ) {}

    create(createPropertyDto: CreatePropertyDto): Promise<PropertyEntity>{
        return this.datasource.create(createPropertyDto);
    }

    getAll(): Promise<PropertyEntity[]> {
        return this.datasource.getAll();
    }

    getById(id: string): Promise<PropertyEntity> {
        return this.datasource.getById(id);
    }

    updateById(updatePropertyDto: UpdatePropertyDto): Promise<PropertyEntity> {
        return this.datasource.updateById(updatePropertyDto);
    }

    deleteById(id: string): Promise<PropertyEntity> {
        return this.datasource.deleteById(id);
    }

}