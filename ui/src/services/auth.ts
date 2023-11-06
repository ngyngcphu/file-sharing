import { trackerServer, invoke } from './common';

export const authService = {
  signup: (payload: SignupPayload) => invoke(trackerServer.post('/auth/signup', payload)),
  login: (payload: LoginPayload) => invoke(trackerServer.post('/auth/login', payload)),
  logout: (payload: LogoutPayload) => invoke(trackerServer.post('/auth/logout', payload))
};
