import { trackerServer, invoke } from './common';

export const userService = {
  getInfo: () => invoke<{ id: string }>(trackerServer.get('/api/user'))
};
