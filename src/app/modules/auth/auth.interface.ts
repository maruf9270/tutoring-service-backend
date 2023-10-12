export type IAuth = {
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  role: 'super_admin' | 'admin' | 'user';
  email: string;
  phone: string;
  address: string;
  profileImage: string;
  password: string;
};
export type ILogin = {
  email: string;
  password: string;
};
export type ITokens = {
  accessToken: string;
  refreashToken: string;
};
