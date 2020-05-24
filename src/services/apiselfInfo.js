import request from '@/utils/request';
// saveUserInfoModify, saveUserModifyPSW
export async function saveUserInfoModify(params) {
    return request('/apikoa/UserInfo/saveUserInfoModify', {
        method: 'POST',
        data: params,
      });
}

export async function saveUserModifyPSW(params) {
    return request('/apikoa/UserInfo/saveUserModifyPSW', {
        method: 'POST',
        data: params,
      });
}