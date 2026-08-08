import API from './api';
import { HistoryItem } from '../types';

export const fetchHistory = async (): Promise<HistoryItem[]> => {
  try {
    const res = await API.get('/history');
    return res.data;
  } catch (error) {
    return [];
  }
};

export const saveHistoryRecord = async (item: Partial<HistoryItem>): Promise<HistoryItem | null> => {
  try {
    const res = await API.post('/history', item);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const deleteHistoryRecord = async (id: string) => {
  try {
    await API.delete(`/history/${id}`);
  } catch (error) {}
};

export const clearAllHistoryRecords = async () => {
  try {
    await API.delete('/history/clear');
  } catch (error) {}
};
