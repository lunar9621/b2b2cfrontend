import request from '@/utils/request';
//queryListMakeSource,queryListSetting,queryListTimestamp,saveListSetting
export async function queryListMakeSource(id) {
     console.log("apiqueryListmakeSource");
    return request(`/api/listMake/queryListMakeSource?moduleID=${id}`);
}

export async function queryListNewMenu(id) {
 return request(`/apikoa/listMake/queryListNewMenu?moduleID=${id}`);
}

export async function queryListSetting(id) {
return request(`/apikoa/listMake/queryListSetting?moduleID=${id}`);
}
export async function queryListTimestamp(id) {
    return request(`/api/listMake/queryListTimestamp?moduleID=${id}`);
}

export async function saveListSetting(params) {
    return request('/apikoa/listMake/saveListSetting', {
      method: 'POST',
      data: params,
    });
  }