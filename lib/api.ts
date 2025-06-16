import axios from "axios";

const apiBaseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://it-navigator.vercel.app'
    : '';

export const instance = axios.create({
  baseURL: apiBaseUrl + (process.env.NEXT_PUBLIC_API_URL || ''),
});

export const instanceAdmin = axios.create({
  baseURL: apiBaseUrl + (process.env.NEXT_PUBLIC_API_URL_ADMIN || ''),
});
