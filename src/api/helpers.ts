import { AxiosError as ErrorResponse, AxiosResponse as Response } from 'axios'

export const handleApiSuccess = (response:Response):any => response.data;

export const handleApiError = (e: ErrorResponse):Promise<string> => {
  console.error(e);
  return Promise.reject(
    e.response?.data?.message || e.response?.statusText || "request failed"
  );
}