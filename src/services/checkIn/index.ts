import { apiPost } from "..";

// 入住登记(增删改查)
export const addLife = (data: Record<string, any>) => {
  return apiPost('/life/add', data);
}
export const editLife = (data: Record<string, any>) => {
  return apiPost('/life/edit', data);
}
export const deleteLife = (id: number) => {
  return apiPost('/life/delete', { id });
}
export const pageLife = (data: Record<string, any>) => {
  return apiPost('/life/page', data);
}

// 寝室管理(增删改查)
export const addBedRoom = (data: Record<string, any>) => {
  return apiPost('/bedroom/add', data);
}
export const editBedRoom = (data: Record<string, any>) => {
  return apiPost('/bedroom/edit', data);
}
export const deleteBedRoom = (id: number) => {
  return apiPost('/bedroom/delete', { id });
}
export const pageBedRoom = (data: Record<string, any>) => {
  return apiPost('/bedroom/page', data);
}
// 通过寝室号查找寝室
export const getBedroomByNum = (data: { bedroomNum: string, isLive: number }) => {
  // isLive 0 获取未满寝室 1获取已满寝室，2获取全部寝室
  return apiPost('/bedroom/getBedroomByNum', data);
}
