import { apiPost } from "..";

export const login = (data: {username: string, password: string}) => {
  return apiPost('/user/login', data);
}
