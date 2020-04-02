import request from '@/utils/request';
//queryListMakeSource,queryListSetting,queryUserList,userManageResetPWD
export async function queryCoopList(params) {
    return request(`/api/listMake/queryCoopList?${JSON.stringify(params)}`);
}
export async function queryListSetting(id) {
return request(`/api/listMake/queryListSetting?id=${id}`);
}

export async function queryUserList(params) {
    return request(`/api/listMake/queryUserList?${JSON.stringify(params)}`);
}

export async function userManageResetPWD(params) {
    return request('/api/listMake/userManageResetPWD', {
        method: 'POST',
        data: params,
      });
}

export async function userManageDelete(params) {
    return request('/api/listMake/userManageDelete', {
        method: 'POST',
        data: params,
      });
}
