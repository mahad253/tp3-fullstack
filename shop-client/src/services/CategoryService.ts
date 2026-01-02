import { Category, MinimalCategory } from '../types';
import { ResponseArray } from '../types/response';
import apiClient from '../utils/axiosClient';
import { AxiosResponse } from 'axios';

export function getCategories(page: number, size: number): Promise<ResponseArray<Category>> {
    return apiClient.get('/api/v1/categories', {
        params: { page, size },
    });
}

export function getCategory(id: string): Promise<AxiosResponse<Category>> {
    return apiClient.get(`/api/v1/categories/${id}`);
}

export function createCategory(category: MinimalCategory): Promise<AxiosResponse<Category>> {
    return apiClient.post('/api/v1/categories', category);
}

export function editCategory(category: MinimalCategory): Promise<AxiosResponse<Category>> {
    return apiClient.put('/api/v1/categories', category);
}

export function deleteCategory(id: string): Promise<AxiosResponse<Category>> {
    return apiClient.delete(`/api/v1/categories/${id}`);
}
