import { create } from 'zustand';
import { fileService } from '@services';

export const useFileStore = create<FileStore>()((set) => ({
    fileStatus: 'UNINIT',
    fileData: {
        etag: '',
        versionId: ''
    },
    uploadFile: async (file, fname) => {
        set(() => ({ fileStatus: 'PENDING' }));
        try {
            const fileData = await fileService.upload(file, fname);
            set(() => ({ fileData: fileData, fileStatus: 'SUCCESS' }));
        } catch (err) {
            set(() => ({ fileStatus: 'REJECT' }));
        }
    }
}));
