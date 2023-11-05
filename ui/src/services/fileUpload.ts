import { localRepoServer, trackerServer, invoke } from '@services';

export const fileUploadService = {
    uploadToLocalRepo: (file: File, fname: string) => {
        const formData = new FormData();
        formData.append('file', file);
        return invoke<FileMetadata>(
            localRepoServer.post(`/api/file/${fname}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        );
    },
    uploadToServer: (payload: SessionFileMetadata) => 
        invoke<{ fileId: string }>(trackerServer.post('/api/file', payload)),
    getListFileMetadata: () => 
        invoke<FileMetadata[]>(localRepoServer.get('/api/file/metadata')),
    uploadListFileMetadata: (payload: ListFileMetadata) => 
        invoke<number>(trackerServer.post('/api/listFiles', payload))
};
