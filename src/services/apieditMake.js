import request from '@/utils/request';
//queryListMakeSource,queryListSetting
export async function queryEditMakeSource(id) {
    return request(`/api/editMake/queryEditMakeSource?moduleID=${id}`);
}
export async function queryEditSetting(id) {
    return request(`/apikoa/editMake/queryEditSetting?moduleID=${id}`);
}

export async function queryEditTimestamp(id) {
    return request(`/api/editMake/queryEditTimestamp?id=${id}`);
}

export async function saveEditSetting(params) {
    return request('/apikoa/editMake/saveEditSetting', {
      method: 'POST',
      data: params,
    });
  }