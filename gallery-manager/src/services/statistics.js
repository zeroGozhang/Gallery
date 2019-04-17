import qs from 'qs';
import { levelTest } from '@/config/api';
import http from '../utils/http';

export default async function getDataList(options) {
  const { id, page, size, time_start, time_end } = options;
  const params = {
    page,
    size,
    time_start,
    time_end,
  };
  return http.get(`${levelTest().statistics}/${id}?${qs.stringify(params)}`, {
    withCredentials: false,
  });
}
