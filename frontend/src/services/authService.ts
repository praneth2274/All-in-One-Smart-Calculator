import API from './api';
import { User } from '../types';

export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  const res = await API.post('/auth/register', { name, email, password });
  return res.data;
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  const res = await API.post('/auth/login', { email, password });
  return res.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await API.get('/auth/me');
  return res.data;
};

export const updateProfile = async (name: string, avatar?: string): Promise<User> => {
  const res = await API.put('/user/profile', { name, avatar });
  return res.data;
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  const res = await API.put('/user/password', { currentPassword, newPassword });
  return res.data;
};
