import { server, invoke } from './common';

export const authService = {
  login: (payload: LoginPayload) => invoke<LoginResult>(server.post('/auth/login', payload)),
  logout: (payload: LogoutPayload) => invoke<string>(server.post('/auth/logout', payload))
};
