import { prisma } from '../../data/postgres';
import { UuidAdapter, S3Adapter } from '../../config';
import { AgentDataSource } from '../../domain/datasources';
import { CreateAgentDto } from '../../domain/dtos';
import { AgentEntity } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class AgentDataSourceImpl implements AgentDataSource {
    constructor() { }

    async createAgent(createAgentDto: CreateAgentDto): Promise<AgentEntity> {
        try {
            const agentExists = await prisma.agent.findFirst({
                where: {
                    email: createAgentDto.email
                }
            });
            if (agentExists) {
                throw CustomError.internalServer(`Agent with email ${createAgentDto.email} already exists`);
            }

            const fileExtension = createAgentDto.avatar.mimetype.split('/')[1] ?? '';
            const fileName = UuidAdapter.v4();
            const fileUrl = await S3Adapter.uploadFile(createAgentDto.avatar, fileName, fileExtension);
            if (!fileUrl || fileUrl === '') throw CustomError.internalServer('Error uploading file');
            
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

    async getAgentById(id: string): Promise<AgentEntity> {
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
    
    async getAgents(): Promise<AgentEntity[]> {
        try {
            const agents = await prisma.agent.findMany();
            return agents.map( agent => AgentEntity.fromObject(agent) );
        }
        catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
    deleteAgent(id: string): Promise<AgentEntity> {
        throw CustomError.internalServer('Method not implemented.');
    }
}