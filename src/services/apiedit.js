import request from '@/utils/request';
//queryListMakeSource,queryListSetting
export async function queryUserEdit(params){
    return request(`/api/editMake/queryUserEdit?${JSON.stringify(params)}`);
}

export async function saveUserEdit(params) {
    return request('/api/editMake/saveUserEdit', {
        method: 'POST',
        data: params,
      });
}