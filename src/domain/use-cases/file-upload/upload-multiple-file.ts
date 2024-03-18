import { FileRepository } from '../../repositories';

export interface UploadMultipleFileUseCase {
     execute(file: object[], folder: string, validExtension: string[]): Promise<object[]>;
}

export class UploadMultipleFile implements UploadMultipleFileUseCase {

    constructor(
        private readonly repository: FileRepository
    ) { }

    execute(files: object[], folder: string, validExtension: string[]): Promise<object[]> {
        return this.repository.uploadMultiple(files, folder, validExtension);
    }

}