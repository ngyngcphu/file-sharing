import { localRepoServer, invoke } from '@services';

export const fileService = {
    upload: (file: File, fname: string) => {
        const formData = new FormData();
        formData.append('file', file);
        return invoke<FileUploadResult>(
            localRepoServer.post(`/api/file/${fname}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        );
    }
};
