export const VALID_EXTENSIONS = ['jpg', 'jpeg', 'png'];
export const MAX_FILE_SIZE = 5000000; // 5MB

export function isValidExtension(fileExtension: string): boolean {
    return VALID_EXTENSIONS.includes(fileExtension);
}

export function isValidSize(fileSize: number): boolean {
    return fileSize <= MAX_FILE_SIZE;
}
