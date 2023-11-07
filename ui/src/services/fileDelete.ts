import { localRepoServer, trackerServer, invoke } from '@services';

export const fileDeleteService = {
    delete: (fname: string) => invoke<string>(localRepoServer.delete(`/api/file/${fname}`)),
    markDeleted: (sessionId: string, fname: string) => 
        invoke<string>(trackerServer.patch(`/api/file/${sessionId}/${fname}`))
};