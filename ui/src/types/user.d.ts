type UserData = {
  userId: string;
  sessionId: string;
}

type UserStore = {
  userStatus: StoreStatus;
  userData: UserData;
  getUserData: () => Promise<void>;
};
