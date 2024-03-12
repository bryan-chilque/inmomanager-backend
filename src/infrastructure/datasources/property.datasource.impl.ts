import { prisma } from '../../data/postgres/index';
import { CreatePropertyDto, UpdatePropertyDto} from "../../domain/dtos";
import { PropertyDataSource } from '../../domain/datasources';
import { PropertyEntity } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class PropertyDataSourceImpl implements PropertyDataSource {

    async create( createPropertyDto: CreatePropertyDto ): Promise<PropertyEntity> {
        const agentExists = await prisma.agent.findUnique({
              where: {
                id: createPropertyDto.agentId
            }
        });
        if (!agentExists) throw CustomError.badRequest(`Agent with id ${createPropertyDto.agentId} not found`);
        
        const districtExists = await prisma.district.findUnique({
            where: {
                id: createPropertyDto.districtId
            }
        });
        if (!districtExists) throw CustomError.badRequest(`District with id ${createPropertyDto.districtId} not found`);

        const propertyExists = await prisma.property.findFirst({
            where: {
                title: createPropertyDto.title
            }
        });
        if (propertyExists) {
            throw CustomError.badRequest(`Property with title ${createPropertyDto.title} already exists`);
        } 

        try {
            const property = await prisma.property.create({
              data: {
                ...createPropertyDto,
                agentId: agentExists.id
              }
            });
            return PropertyEntity.fromObject( property );
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
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
