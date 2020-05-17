import request from '@/utils/request';
//queryListMakeSource,queryListSetting
export async function queryDetailMakeSource(id) {
    return request(`/api/detailMake/queryDetailMakeSource?moduleID=${id}`);
}
export async function queryDetailSetting(id) {
return request(`/apikoa/detailMake/queryDetailSetting?moduleID=${id}`);
}
export async function queryDetailTimestamp(id) {
    return request(`/api/detailMake/queryDetailTimestamp?moduleID=${id}`);
}

export async function saveDetailSetting(params) {
    return request('/apikoa/detailMake/saveDetailSetting', {
      method: 'POST',
      data: params,
    });
  }