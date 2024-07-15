import axios from 'axios'

import { BASE_API_URL } from 'src/constants/env'


import { axiosInstance } from './axios'


const handleApiError = (error: unknown, apiName: string): Error => {
	console.error(`API request ${apiName} failed:`, error);

	if (axios.isAxiosError(error)) {
		return new Error(`API error: ${error.response?.status} ${error.response?.statusText}`);
	} else {
		return new Error('An unexpected error occurred');
	}
};


export async function getAttributes(params: AttributesQueryParams = {}): Promise<AttributesResponse> {
	try {
		// Default query params
		const {
			offset = 0,
			limit = 10,
			searchText = "",
			sortBy = "name",
			sortDir = "asc"
		} = params;

		// Query string
		const queryString = new URLSearchParams({
			offset: offset.toString(),
			limit: limit.toString(),
			searchText,
			sortBy,
			sortDir
		}).toString();

		const { data } = await axiosInstance.get<AttributesResponse>(`${BASE_API_URL}/attributes?${queryString}`);
		return data;
	} catch (error) {
		throw handleApiError(error, "getAttributes");
	}
}


export async function getAttributeById(id: string): Promise<AttributeByIdResponse> {
	try {

		const { data } = await axiosInstance.get<AttributeByIdResponse>(`${BASE_API_URL}/attributes/${id}`);
		return data;

	} catch (error) {
		throw handleApiError(error, "getAttributeById");
	}
}


export async function deleteAttributeById(id: string): Promise<AttributeByIdResponse> {
	try {

		const { data } = await axiosInstance.delete<AttributeByIdResponse>(`${BASE_API_URL}/attributes/${id}`);
		return data;

	} catch (error) {
		throw handleApiError(error, "deleteAttributeById");
	}
}


export async function getLabels(params: LabelsQueryParams = {}): Promise<LabelsResponse> {
	try {
		// Default query params
		const {
			offset = 0,
			limit = 10,
		} = params;

		// Query string
		const queryString = new URLSearchParams({
			offset: offset.toString(),
			limit: limit.toString(),
		}).toString();

		const { data } = await axiosInstance.get<AttributesResponse>(`${BASE_API_URL}/attributes?${queryString}`);
		return data;
	} catch (error) {
		throw handleApiError(error, "getLabels");
	}
}