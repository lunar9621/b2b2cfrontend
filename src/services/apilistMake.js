import request from '@/utils/request';
//queryListMakeSource,queryListSetting,queryListTimestamp
export async function queryListMakeSource(id) {
    return request(`/api/listMake/queryListMakeSource?id=${id}`);
}
export async function queryListSetting(id) {
return request(`/api/listMake/queryListSetting?id=${id}`);
}
export async function queryListTimestamp(id) {
    return request(`/api/listMake/queryListTimestamp?id=${id}`);
}