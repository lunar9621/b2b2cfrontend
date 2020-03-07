import request from '@/utils/request';
//queryListMakeSource,queryListSetting
export async function queryCoopList(params) {
    return request(`/api/listMake/queryCoopList?${JSON.stringify(params)}`);
}
export async function queryListSetting(id) {
return request(`/api/listMake/queryListSetting?id=${id}`);
}
