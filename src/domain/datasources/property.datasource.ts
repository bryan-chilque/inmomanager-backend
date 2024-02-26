import { PropertyEntity } from "../entities/property.entity";
import { CreatePropertyDto, UpdatePropertyDto } from '../dtos';

export abstract class PropertyDataSource {
    abstract create( createPropertyDto: CreatePropertyDto): Promise<PropertyEntity>;
    abstract getAll(): Promise<PropertyEntity[]>;
    abstract getById(id: string): Promise<PropertyEntity>;
    abstract updateById(updatePropertyDto: UpdatePropertyDto): Promise<PropertyEntity>;
    abstract deleteById(id: string): Promise<PropertyEntity>;
}