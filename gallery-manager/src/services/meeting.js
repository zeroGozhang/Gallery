import { meetingManage } from '@/config/api';
import http from '../utils/http';

export async function getMeetingList(options) {
  const { page, size } = options;
  const params = {
    page,
    size,
  };
  return http.get(`${meetingManage().list}`, {
    params,
  });
}

// 新增会议

export  async function addMeetingForm(params) {
  return http.post(`${meetingManage().galleryUrl}`, params, {
    withCredentials: false,
  });
}

export async function fetchMeetingInfo(id) {
  return http.get(`${meetingManage().list}/${id}`,{
    withCredentials: false,
  });
}

export async function editMeetingForm(id, params) {
  return http.post(`${meetingManage().list}/${id}`, params, {
    withCredentials: false,
  });
}

export async function deleteMeetingInfo(id) {
  return http.delete(`${meetingManage().list}/${id}`,{
    withCredentials: false,
  }); 
}


