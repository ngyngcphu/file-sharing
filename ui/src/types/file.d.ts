type FileMetadata = {
    name: string;
    type: string;
    size: number;
}

type SessionFileMetadata = FileMetadata & { sessionId: string };

type FileStore = {
    localStatus: StoreStatus;
    serverStatus: StoreStatus;
    fileMetadata: FileMetadata;
    fileIdFromServer: string;
    uploadFileDataToLocalRepo: (file: File, fname: string) => Promise<void>;
    uploadFileMetadataToServer: (payload: SessionFileMetadata ) => Promise<void>;
};