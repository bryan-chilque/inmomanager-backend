import { PropertyEntity } from "../entities/property.entity";
import { CreatePropertyDto, UpdatePropertyDto } from '../dtos';
import { UserEntity } from '../entities/user.entity';

export abstract class PropertyRepository {
    abstract create( createPropertyDto: CreatePropertyDto): Promise<PropertyEntity>;
    abstract getAll(): Promise<PropertyEntity[]>;
    abstract getById(id: string): Promise<PropertyEntity>;
    abstract updateById(updatePropertyDto: UpdatePropertyDto): Promise<PropertyEntity>;
    abstract deleteById(id: string): Promise<PropertyEntity>;
}