import request from '@/utils/request';
export async function query() {
  return request('/apikoa/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/apikoa/queryNotices');
}

export async function queryNoticeDetail(id) {
  return request(`/apikoa/queryNoticeDetail?id=${id}`);
}
