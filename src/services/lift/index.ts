import { apiPost } from '..';

// 作息管理(增删改查)
export const addWorkrest = (data: Record<string, any>) => {
  return apiPost('/workrest/add', data);
}
export const editWorkrest = (data: Record<string, any>) => {
  return apiPost('/workrest/edit', data);
}
export const deleteWorkrest = (id: number) => {
  return apiPost('/workrest/delete', { id });
}
export const pageWorkrest = (data: Record<string, any>) => {
  return apiPost('/workrest/page', data);
}

// 外出报备
export const addGoOut = (data: Record<string, any>) => {
  return apiPost('/goout/add', data);
}
export const editGoOut = (data: Record<string, any>) => {
  return apiPost('/goout/edit', data);
} 
export const deleteGoOut = (id: number) => {
  return apiPost('/goout/delete', { id });
}
export const pageGoOut = (data: Record<string, any>) => {
  return apiPost('/goout/page', data);
}
