import request from '@/utils/request';
//queryListMakeSource,queryListSetting
export async function queryDetailMakeSource(id) {
    return request(`/api/detailMake/queryDetailMakeSource?id=${id}`);
}
export async function queryDetailSetting(id) {
return request(`/api/listMake/queryDetailSetting?id=${id}`);
}
