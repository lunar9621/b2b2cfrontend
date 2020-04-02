import request from '@/utils/request';
//queryListMakeSource,queryListSetting
export async function queryEditMakeSource(id) {
    return request(`/api/editMake/queryEditMakeSource?id=${id}`);
}
export async function queryEditSetting(id) {
return request(`/api/editMake/queryEditSetting?id=${id}`);
}

export async function queryEditTimestamp(id) {
    return request(`/api/editMake/queryEditTimestamp?id=${id}`);
}
