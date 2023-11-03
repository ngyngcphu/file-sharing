import { create } from 'zustand';
import { authService } from '@services';

export const useSessionStore = create<SessionStore>()((set) => ({
    sessionStatus: 'UNINIT',
    userId: '',
    sessionId: '',
    login: async (payload) => {
        set(() => ({ sessionStatus: 'PENDING' }));
        try {
            const data = await authService.login(payload);
            set(() => ({
                userId: data.userId,
                sessionId: data.sessionId,
                sessionStatus: 'SUCCESS'
            }));
        } catch (err) {
            set(() => ({ sessionStatus: 'REJECT' }));
        }
    },
    logout: async (payload) => {
        set(() => ({ sessionStatus: 'PENDING' }));
        try {
            const data = await authService.logout(payload);
            set(() => ({
                userId: '',
                sessionId: '',
                sessionStatus: 'SUCCESS'
            }));
        } catch (err) {
            set(() => ({ sessionStatus: 'REJECT' }));
        }
    }
}));
