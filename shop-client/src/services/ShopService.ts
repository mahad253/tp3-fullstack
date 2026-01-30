import { MinimalShop } from './../types/shop';
import { Shop } from '../types';
import { ResponseArray } from '../types/response';
import apiClient from '../utils/axiosClient';
import { AxiosResponse } from 'axios';

export function getShops(page: number, size: number): Promise<ResponseArray<Shop>> {
    return apiClient.get('/api/v1/shops', {
        params: { page, size },
    });
}

export function getShopsSorted(page: number, size: number, sort: string): Promise<ResponseArray<Shop>> {
    return apiClient.get('/api/v1/shops', {
        params: { page, size, sortBy: sort },
    });
}

export function getShopsFiltered(page: number, size: number, urlFilters: string): Promise<ResponseArray<Shop>> {
    return apiClient.get(`/api/v1/shops?page=${page}&size=${size}${urlFilters}`);
}

/* ================== ELASTIC SEARCH ================== */
export function getShopsByLabel(
    page: number,
    size: number,
    label: string
): Promise<ResponseArray<Shop>> {
    return apiClient.get('/api/v1/shops', {
        params: {
            page,
            size,
            label,
        },
    });
}
/* =================================================== */

export function getShop(id: string): Promise<AxiosResponse<Shop>> {
    return apiClient.get(`/api/v1/shops/${id}`);
}

export function createShop(shop: MinimalShop): Promise<AxiosResponse<Shop>> {
    return apiClient.post('/api/v1/shops', shop);
}

export function editShop(shop: MinimalShop): Promise<AxiosResponse<Shop>> {
    return apiClient.put('/api/v1/shops', shop);
}

export function deleteShop(id: string): Promise<AxiosResponse<Shop>> {
    return apiClient.delete(`/api/v1/shops/${id}`);
}
