import { PropertyEntity } from "../entities";
import { CreatePropertyDto, UpdatePropertyDto } from '../dtos';

export abstract class PropertyRepository {
    abstract create( createPropertyDto: CreatePropertyDto): Promise<PropertyEntity>;
    abstract getById(id: string): Promise<PropertyEntity>;
    abstract getAll(): Promise<PropertyEntity[]>;
    abstract updateById(updatePropertyDto: UpdatePropertyDto): Promise<PropertyEntity>;
    abstract deleteById(id: string): Promise<PropertyEntity>;
}