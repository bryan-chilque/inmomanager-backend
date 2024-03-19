import { prisma } from '../../data/postgres';
import { UuidAdapter, S3Adapter } from '../../config';
import { AgentDataSource } from '../../domain/datasources';
import { CreateAgentDto } from '../../domain/dtos';
import { AgentEntity } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { UpdateAgentDto } from '../../domain/dtos/agent/update-agent.dto';

export class AgentDataSourceImpl implements AgentDataSource {
    constructor() { }

    async create(createAgentDto: CreateAgentDto): Promise<AgentEntity> {
        try {
            const agentExists = await prisma.agent.findFirst({
                where: {
                    email: createAgentDto.email
                }
            });
            if (agentExists) {
                throw CustomError.internalServer(`Agent with email ${createAgentDto.email} already exists`);
            }
            let fileUrl;
            if (createAgentDto.avatar) {
                const fileExtension = createAgentDto.avatar.mimetype.split('/')[1] ?? '';
                const fileName = UuidAdapter.v4();
                fileUrl = await S3Adapter.uploadFile(createAgentDto.avatar, fileName, fileExtension);
                if (!fileUrl || fileUrl === '') throw CustomError.internalServer('Error uploading file');
            }

            const agent = await prisma.agent.create({
                data: {
                    ...createAgentDto,
                    avatar: fileUrl
                }
            });

            return AgentEntity.fromObject(agent);

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async getById(id: string): Promise<AgentEntity> {
        try {
            const agent = await prisma.agent.findUnique({
                where: { id }
            });
            if (!agent) {
                throw CustomError.notFound(`Agent with id ${id} not found`);
            }
            return AgentEntity.fromObject(agent);
        }
        catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
    
    async getAll(): Promise<AgentEntity[]> {
        try {
            const agents = await prisma.agent.findMany();
            return agents.map( agent => AgentEntity.fromObject(agent) );
        }
        catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async updateById(updateAgentDto: UpdateAgentDto): Promise<AgentEntity> {
        const oldData = await this.getById(updateAgentDto.id);
        let fileUrl;
        if (updateAgentDto.avatar) {
            const fileExtension = updateAgentDto.avatar.mimetype.split('/')[1] ?? '';
            const fileName = UuidAdapter.v4();
            fileUrl = await S3Adapter.uploadFile(updateAgentDto.avatar, fileName, fileExtension);
            if (!fileUrl || fileUrl === '') throw CustomError.internalServer('Error uploading file');
            if (oldData.avatar) await S3Adapter.deleteFile(oldData.avatar);
        }

        const updatedAgent = await prisma.agent.update({
            where: { id: updateAgentDto.id },
            data: {
                ...updateAgentDto.values,
                avatar: fileUrl
            }
        });
        return AgentEntity.fromObject(updatedAgent);
    }

    async deleteById(id: string): Promise<AgentEntity> {
        await this.getById(id);
        const agent = await prisma.agent.delete({
            where: { id }
        });
        if (agent.avatar) await S3Adapter.deleteFile(agent.avatar);
        return AgentEntity.fromObject(agent);
    }

}