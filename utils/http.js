'use server';

import axios from "axios";
import { cookies } from 'next/headers';

export const http = async (...args) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('user');
  const user = cookie ? JSON.parse(cookie.value) : {};
  const token = user.token;

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      Authorization: token
    }
  });

  const res = await axiosInstance(...args);
  return JSON.stringify(res.data);
}
