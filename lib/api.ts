import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const instance = axios.create({
  baseURL: apiBaseUrl + (process.env.NEXT_PUBLIC_API_URL || ''),
});

export const instanceAdmin = axios.create({
  baseURL: apiBaseUrl + (process.env.NEXT_PUBLIC_API_URL_ADMIN || ''),
});