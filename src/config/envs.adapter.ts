import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').default('3000').asPortNumber(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    AWS_BUCKET_NAME: get('AWS_BUCKET_NAME').required().asString(),
    AWS_BUCKET_REGION: get('AWS_BUCKET_REGION').required().asString(),
    AWS_PUBLIC_KEY: get('AWS_PUBLIC_KEY').required().asString(),
    AWS_SECRET_KEY: get('AWS_SECRET_KEY').required().asString(),
}