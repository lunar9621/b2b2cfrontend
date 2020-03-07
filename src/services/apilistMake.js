import request from '@/utils/request';
//queryListMakeSource,queryListSetting
export async function queryListMakeSource(id) {
    return request(`/api/listMake/queryListMakeSource?id=${id}`);
}
export async function queryListSetting(id) {
return request(`/api/listMake/queryListSetting?id=${id}`);
}
