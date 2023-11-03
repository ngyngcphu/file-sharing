type UserStore = {
  userStatus: StoreStatus;
  userData: { id: string };
  getUserData: () => Promise<void>;
};
