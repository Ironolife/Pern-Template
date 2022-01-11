import { AxiosError } from 'axios';

export const onError = (err: AxiosError) => {
  if (err.response) throw err.response.data;
  if (err.request) throw new Error('Request failed');
  throw new Error('Unknown error occurred');
};
