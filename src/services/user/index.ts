import { apiPost } from "..";

// 登录
export const login = (data: {username: string, password: string}) => {
  return apiPost('/user/login', data);
}

// 管理员(增删改查)
export const addAdmin = (data: Record<string, any>) => {
  return apiPost('/user/add', data);
};
export const deleteAdmin = (id: number) => {
  return apiPost('/user/delete', { id });
};
export const editAdmin = (data: Record<string, any>) => {
  return apiPost('/user/update', data);
};
export const pageAdmin = (data: Record<string, any>) => {
  return apiPost('/user/page', data);
};

// 人员管理(增删改查)
export const addOldPerson = (data: Record<string, any>) => {
  return apiPost('/oldperson/add', data);
};
export const deleteOldPerson = (id: number) => {
  return apiPost('/oldperson/delete', { id });
};
export const editOldPerson = (data: Record<string, any>) => {
  return apiPost('/oldperson/update', data);
};
export const pageOldPerson = (data: Record<string, any>) => {
  return apiPost('/oldperson/page', data);
};
// 通过人员获取人员列表
export const getOldpersonByName = (oldPersonName: string) => {
  return apiPost('/oldperson/getOldpersonByName', { oldPersonName });
};
