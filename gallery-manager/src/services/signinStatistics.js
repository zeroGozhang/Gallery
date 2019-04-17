import { levelTest } from '@/config/api';
import http from '../utils/http';

export default async function getDataList(options) {
  const { page, size } = options;
  const params = {
    page,
    size,
  };
  return http.get(`${levelTest().signinStatistics}`, {
    params,
  });
}
