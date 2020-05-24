import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  return request('/apikoa/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function queryCurrent() {
  return request('/api/currentUser');
}