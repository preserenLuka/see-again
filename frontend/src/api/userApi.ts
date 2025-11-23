import api from "./axios";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const createUser = (userData: User) => {
  const response = api.post("users/register", userData);
  return response;
};

type userLoginData = {
  email: string;
  password: string;
};

export const loginUser = (userData: userLoginData) => {
  const response = api.post("users/login", userData);
  return response;
};
