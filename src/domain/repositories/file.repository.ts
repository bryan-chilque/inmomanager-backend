export abstract class FileRepository {
    abstract checkFolder( folderPath: string): any;
    abstract uploadSingle( file: any, folder: string, validExtension: string[]): Promise<object>;
    abstract uploadMultiple( file: object[], folder: string, validExtension: string[]): Promise<object[]>;
}