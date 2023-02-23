import { apiPost } from "..";

// 健康(增删改查)
export const addHealthy = (data: Record<string, any>) => {
  return apiPost('/healthy/add', data);
}
export const editHealthy = (data: Record<string, any>) => {
  return apiPost('/healthy/update', data);
}
export const deleteHealthy = (id: number) => {
  return apiPost('/healthy/delete', { id });
}
export const pageHealthy = (data: Record<string, any>) => {
  return apiPost('/healthy/page', data);
}

// 病历(增删改查)
export const addCases = (data: Record<string, any>) => {
  return apiPost('/cases/add', data);
}
export const editCases = (data: Record<string, any>) => {
  return apiPost('/cases/edit', data);
}
export const deleteCases = (id: number) => {
  return apiPost('/cases/delete', { id });
}
export const pageCases = (data: Record<string, any>) => {
  return apiPost('/cases/page', data);
}
