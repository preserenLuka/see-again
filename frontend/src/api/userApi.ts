import api from "./axios.ts";

type User = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export const createUser = (userData: User) => {
    const response = api.post("users", userData);
    return response;
}