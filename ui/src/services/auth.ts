import { trackerServer, invoke } from './common';

export const authService = {
  login: (payload: LoginPayload) => invoke<LoginResult>(trackerServer.post('/auth/login', payload)),
  logout: (payload: LogoutPayload) => invoke<string>(trackerServer.post('/auth/logout', payload))
};
