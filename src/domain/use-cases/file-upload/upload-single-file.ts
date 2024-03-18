import { FileRepository } from '../../repositories';

export interface UploadSingleFileUseCase {
     execute(file: any, folder: string, validExtension: string[]): Promise<object>;
}

export class UploadSingleFile implements UploadSingleFileUseCase {

    constructor(
        private readonly repository: FileRepository
    ) { }

    execute(file: any, folder: string, validExtension: string[]): Promise<object> {
        return this.repository.uploadSingle(file, folder, validExtension);
    }

}