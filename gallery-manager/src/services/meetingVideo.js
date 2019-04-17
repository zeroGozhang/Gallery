import { meetingManage } from '@/config/api';
import http from '../utils/http';

// 获取会议绑定文章列表

export async function getBindedArticleList(options) {
  const { id, page, size } = options;
  const params = {
    id,
    page,
    size,
  };
  return http.get(`${meetingManage().articleUrl}`, {
    params,
  });
}

// 修改会议绑定文章

export async function bindArticles(options) {
  return http.post(`${meetingManage().toBindArticle}`, options, {
    withCredentials: false,
  });
}

// 获取文章列表

export async function getArticleList(options) {
  const { program = 10008, page, size } = options;
  const params = {
    program,
    page,
    size,
  };
  return http.get(`${meetingManage().articleList}`, {
    params,
  });
}
