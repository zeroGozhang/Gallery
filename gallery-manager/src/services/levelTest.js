import qs from 'qs';
import { levelTest } from '@/config/api';
import http from '../utils/http';
import { captcha } from '@/config/api';

// 获取图形验证码

export async function getImageCode() {
  return http.post(captcha().image);
}

// 新增闯关

export async function addBreakThrough(params) {
  return http.post(`${levelTest().url}`, params, {
    withCredentials: false,
  });
}

// 获取正常类型的闯关列表

export async function getNormalTestListData() {
  return http.get(`${levelTest().url}?type=normal`);
}

// 获取闯关列表

export async function getTestListData() {
  return http.get(`${levelTest().url}`);
}

// 删除闯关  

export async function deleteLevel(id) {
  return http.delete(`${levelTest().url}/${id}`, {
    withCredentials: false,
  });
}

// 编辑闯关  

export async function editLevel(options) {
  
  const { id, end_time, create_time, name, status, type, time_limit } = options;
  const params = {
    name,
    status,
    end_time,
    create_time,
    type,
    time_limit,
  };
  return http.put(`${levelTest().url}/${id}`, params, {
    withCredentials: false,
  });
}

// 获取单个闯关信息

export async function getTestInfo(id) {
  return http.get(`${levelTest().url}/${id}`, {
    withCredentials: false,
  });
}

// 获取闯关关卡列表

export async function getCheckPointList(id) {
  return http.get(`${levelTest().base}/${id}/checkpoints`, {
    withCredentials: false,
  });
}

// 删除关卡  

export async function deleteCheckPoint(params) {
  const { id, checkpointId } = params;
  return http.delete(`${levelTest().base}/${id}/checkpoints/${checkpointId}`, {
    withCredentials: false,
  });
}

// 新增测试

export async function addTest(params) {
  return http.post(`${levelTest().url}?${qs.stringify(params)}`);
}

// 新增关卡

export async function addCheckPoint(options) {
  const { id, condition, list } = options;
  const params = {
    list,
    condition,
  };
  return http.post(`${levelTest().base}/${id}/checkpoints`, params, {
    withCredentials: false,
  });
}

// 编辑关卡

export async function editCheckPoint(options) {
  const { id, checkpointId, condition, list } = options;
  const params = {
    list,
    condition,
  };
  return http.put(`${levelTest().base}/${id}/checkpoints/${checkpointId}`, params, {
    withCredentials: false,
  });
}

// 获取关卡详情

export async function fetchCheckpointInfo(params) {
  const { id, checkpointId } = params;
  return http.get(`${levelTest().base}/${id}/checkpoints/${checkpointId}`, {
    withCredentials: false,
  });
}
