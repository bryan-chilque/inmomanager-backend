import { FileDataSource } from "../../domain/datasources/file.datasource";
import { FileRepository } from "../../domain/repositories/file.repository";

export class FileRepositoryImpl implements FileRepository {
    constructor(
        private readonly datasource: FileDataSource
    ) { }
    checkFolder(folderPath: string): any {
        return this.datasource.checkFolder(folderPath);
    }
    uploadSingle(file: any, folder: string, validExtension: string[]): Promise<object> {
        return this.datasource.uploadSingle(file, folder, validExtension);
    }
    uploadMultiple(file: object[], folder: string, validExtension: string[]): Promise<object[]> {
        return this.datasource.uploadMultiple(file, folder, validExtension);
    }
}