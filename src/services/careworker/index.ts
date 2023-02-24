import { apiPost } from "..";

// 护工(增删改查)
export const addCareworker = (data: Record<string, any>) => {
  return apiPost('/careworker/add', data);
}
export const editCareworker = (data: Record<string, any>) => {
  return apiPost('/careworker/edit', data);
}
export const deletCareworker = (id: number) => {
  return apiPost('/careworker/delete', { id });
}
export const pageCareworker = (data: Record<string, any>) => {
  return apiPost('/careworker/page', data);
}
