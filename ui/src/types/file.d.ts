type FileUploadResult = {
    etag: string;
    versionId: string;
}

type FileStore = {
    fileStatus: StoreStatus;
    fileData: FileUploadResult;
    uploadFile: (file: File, fname: string) => Promise<void>;
};