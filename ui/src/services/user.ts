import { trackerServer, invoke } from './common';

export const userService = {
  getInfo: () => invoke<UserData>(trackerServer.get('/api/user'))
};
