type SignupPayload = {
  fullName: string;
  username: string;
  password: string;
}

type LoginPayload = {
  username: string;
  password: string;
};

type LogoutPayload = LoginPayload;
