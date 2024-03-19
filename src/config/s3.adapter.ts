import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { envs } from "./envs.adapter";

const client = new S3Client({
    region: envs.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: envs.AWS_PUBLIC_KEY,
        secretAccessKey: envs.AWS_SECRET_KEY,
    },
});

export class S3Adapter {
    static async uploadFile(fileBody: any, fileName: string, fileExtension: string) {
        const uploadParams = {
            Bucket: envs.AWS_BUCKET_NAME,
            Key: 'uploads/users/' + fileName + '.' + fileExtension,
            Body: fileBody.data,
        };
        const command = new PutObjectCommand(uploadParams);
        await client.send(command);
        return `https://${envs.AWS_BUCKET_NAME}.s3.amazonaws.com/uploads/users/${fileName}.${fileExtension}`;
    }

    static async deleteFile(fileUrl: string) {
        const fileName = fileUrl.split('/').pop();
        const deleteParams = {
            Bucket: envs.AWS_BUCKET_NAME,
            Key: 'uploads/users/' + fileName,
        };
        await client.send(new DeleteObjectCommand(deleteParams));
    }

    static async updateFile(fileBody: any, fileName: string, fileExtension: string) {
        const newFileUrl = await this.uploadFile(fileBody, fileName, fileExtension);
        if (newFileUrl) {
            await this.deleteFile(`https://${envs.AWS_BUCKET_NAME}.s3.amazonaws.com/uploads/users/${fileName}.${fileExtension}`);
        }
        return newFileUrl;
    }
     
}
