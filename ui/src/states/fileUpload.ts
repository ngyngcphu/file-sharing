import { create } from 'zustand';
import { fileUploadService } from '@services';

export const useFileUploadStore = create<FileUploadStore>()((set) => ({
    localStatus: 'UNINIT',
    serverStatus: 'UNINIT',
    fileMetadata: {
        name: '',
        type: '',
        size: 0
    },
    fileIdFromServer: '',
    uploadFileDataToLocalRepo: async (file, fname) => {
        set(() => ({ localStatus: 'PENDING' }));
        try {
            const fileMetadata = await fileUploadService.uploadToLocalRepo(file, fname);
            set(() => ({ fileMetadata: fileMetadata, localStatus: 'SUCCESS' }));
        } catch (err) {
            set(() => ({ localStatus: 'REJECT' }));
        }
    },
    uploadFileMetadataToServer: async (payload) => {
        set(() => ({ serverStatus: 'PENDING' }));
        try {
            const data = await fileUploadService.uploadToServer(payload);
            set(() => ({ fileIdFromServer: data.fileId, serverStatus: 'SUCCESS' }));
        } catch (err) {
            set(() => ({ serverStatus: 'REJECT' }));
        }
    }
}));
