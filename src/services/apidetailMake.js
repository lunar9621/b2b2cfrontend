import request from '@/utils/request';
//queryListMakeSource,queryListSetting
export async function queryDetailMakeSource(id) {
    return request(`/api/detailMake/queryDetailMakeSource?id=${id}`);
}
export async function queryDetailSetting(id) {
return request(`/api/detailMake/queryDetailSetting?id=${id}`);
}
export async function queryDetailTimestamp(id) {
    return request(`/api/detailMake/queryDetailTimestamp?id=${id}`);
}