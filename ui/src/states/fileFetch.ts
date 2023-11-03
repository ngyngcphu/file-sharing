import { create } from 'zustand';
import { fileFetchService } from '@services';

export const useFileFetchStore = create<FileFetchStore>()((set) => ({
    fileFetchStatus: 'UNINIT',
    listHostNames: [],
    fetchHostNames: async (fname) => {
        set(() => ({ fileFetchStatus: 'PENDING' }));
        try {
            const listHostNames = await fileFetchService.listHostName(fname);
            set(() => ({ listHostNames: listHostNames, fileFetchStatus: 'SUCCESS' }));
            return listHostNames;
        } catch (err) {
            set(() => ({ fileFetchStatus: 'REJECT' }));
            throw(err);
        }
    }
}));
