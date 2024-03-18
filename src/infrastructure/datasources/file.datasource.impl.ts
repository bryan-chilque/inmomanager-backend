import path from 'path';
import fs from 'fs';
import { UploadedFile } from "express-fileupload";
import { UuidAdapter } from '../../config';
import { FileDataSource } from "../../domain/datasources/file.datasource";
import { CustomError } from '../../domain/errors';


export class FileDataSourceImpl implements FileDataSource {
    constructor(
        private readonly uuid = UuidAdapter.v4
    ) { }

    checkFolder(folderPath: string): any {
        if ( !fs.existsSync(folderPath) ) fs.mkdirSync(folderPath);
    }

    async uploadSingle(
        file: UploadedFile, 
        folder: string, 
        validExtension: string[]
    ): Promise<object> {
        try {
            const fileExtension = file.mimetype.split('/')[1] ?? '';
            if ( !validExtension.includes(fileExtension) ) {
                throw CustomError.badRequest(`Invalid file extension: ${fileExtension}, valid extensions are: ${validExtension.join(', ')}.`);
            }  

            const destination = path.resolve(__dirname, '../../../', folder);
            this.checkFolder(destination);

            const fileName = `${ this.uuid() }.${ fileExtension }`;
            file.mv(`${ destination }/${ fileName }`)
            return { fileName }
        }
        catch (error) {
            console.log({error})
            throw error;
        }
    }

    async uploadMultiple(
        files: UploadedFile[], 
        folder: string, 
        validExtension: string[] = ['jpg', 'jpeg', 'png']
    ): Promise<object[]> {
        try {
            console.log(files)
            const fileNames = await Promise.all(
                files.map( file => this.uploadSingle(file, folder, validExtension) )
            )
            return fileNames 
        }
        catch (error) {
            console.log(error)
            throw error;
        }
    }
}