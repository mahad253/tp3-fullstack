import { MinimalProduct, Product } from '../types';
import { ResponseArray } from '../types/response';
import apiClient from '../utils/axiosClient';
import { AxiosResponse } from 'axios';

export function getProducts(page: number, size: number): Promise<ResponseArray<Product>> {
    return apiClient.get('/api/v1/products', {
        params: { page, size },
    });
}

export function getProductsbyShop(
    shopId: string,
    page: number,
    size: number,
): Promise<ResponseArray<Product>> {
    return apiClient.get('/api/v1/products', {
        params: { shopId, page, size },
    });
}

export function getProductsbyShopAndCategory(
    shopId: string,
    categoryId: number,
    page: number,
    size: number,
): Promise<ResponseArray<Product>> {
    return apiClient.get('/api/v1/products', {
        params: { shopId, categoryId, page, size },
    });
}

export function getProduct(id: string): Promise<AxiosResponse<Product>> {
    return apiClient.get(`/api/v1/products/${id}`);
}

export function createProduct(product: MinimalProduct): Promise<AxiosResponse<Product>> {
    return apiClient.post('/api/v1/products', product);
}

export function editProduct(product: MinimalProduct): Promise<AxiosResponse<Product>> {
    return apiClient.put('/api/v1/products', product);
}

export function deleteProduct(id: string): Promise<AxiosResponse<Product>> {
    return apiClient.delete(`/api/v1/products/${id}`);
}
