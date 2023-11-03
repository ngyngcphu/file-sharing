type LoginPayload = {
  username: string;
  password: string;
};

type LogoutPayload = {
  userId: string;
  sessionId: string;
}

type LoginResult = {
  userId: string;
  sessionId: string;
}

type SessionStore = {
  sessionStatus: StoreStatus;
  userId: string;
  sessionId: string;
  login: (payload: LoginPayload) => Promise<void>;
  logout: (payload: LogoutPayload) => Promise<void>;
}
