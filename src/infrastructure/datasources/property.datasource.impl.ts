import { CreatePropertyDto, PropertyDataSource, PropertyEntity, UpdatePropertyDto } from "../../domain";
import { prisma } from '../../data/postgres/index';

export class PropertyDataSourceImpl implements PropertyDataSource {

    async create( createPropertyDto: CreatePropertyDto ): Promise<PropertyEntity> {
        const property = await prisma.property.create({
          data: createPropertyDto!
        });
        return PropertyEntity.fromObject( property );
      }

    async getAll(): Promise<PropertyEntity[]> {
        const properties = await prisma.property.findMany();
        return properties.map(property => PropertyEntity.fromObject(property));
    }

    async getById(id: string): Promise<PropertyEntity> {
        const property = await prisma.property.findFirst({
            where: { id }
        });
        if ( !property ) throw `Property with id ${id} not found`;
        return PropertyEntity.fromObject(property);
    }

    async updateById(updatePropertyDto: UpdatePropertyDto): Promise<PropertyEntity> {
        await this.getById(updatePropertyDto.id);
        const updatedTodo = await prisma.property.update({
            where: { id: updatePropertyDto.id},
            data: updatePropertyDto!.values
        });
        return PropertyEntity.fromObject(updatedTodo);
    }

    async deleteById(id: string): Promise<PropertyEntity> {
        await this.getById( id );
        const deleted = await prisma.property.delete({
          where: { id }
        });
        return PropertyEntity.fromObject( deleted );
      }
}
