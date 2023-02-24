import { apiPost } from "..";

// 事故管理(增删改查)
export const addAccident = (data: Record<string, any>) => {
  return apiPost('/accident/add', data);
}
export const deleteAccident = (id: number) => {
  return apiPost('/accident/delete', { id });
};
export const editAccident = (data: Record<string, any>) => {
  return apiPost('/accident/edit', data);
};
export const pageAccident = (data: Record<string, any>) => {
  return apiPost('/accident/page', data);
};

// 访客管理(增删改查)
export const addVisitors = (data: Record<string, any>) => {
  return apiPost('/visitors/add', data);
};
export const deleteVisitors = (id: number) => {
  return apiPost('/visitors/delete', { id });
};
export const editVisitors = (data: Record<string, any>) => {
  return apiPost('/visitors/edit', data);
};
export const pageVisitors = (data: Record<string, any>) => {
  return apiPost('/visitors/page', data);
};