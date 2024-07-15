import axios, { AxiosInstance } from 'axios'

export const ACCEPT_HEADER = 'application/json'

export const axiosInstance: AxiosInstance = axios.create({
  headers: { Accept: ACCEPT_HEADER },
  timeout: 30 * 1000,
})
