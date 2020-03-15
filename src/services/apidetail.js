import request from '@/utils/request';
//queryListMakeSource,queryListSetting
export async function queryCoopDetail(params){
    return request(`/api/detailMake/queryCoopDetail?${JSON.stringify(params)}`);
}
