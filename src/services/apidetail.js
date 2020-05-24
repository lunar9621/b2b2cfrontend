import request from '@/utils/request';
//queryListMakeSource,queryListSetting
export async function queryCoopDetail(params){
    return request(`/api/detailMake/queryCoopDetail?${JSON.stringify(params)}`);
}

export async function queryTypeConfigureDetail(ID){
    return request(`/apikoa/detailMake/queryTypeConfigureDetail?typeID=${ID}`);
}

export async function queryContractDetail(code){
    return request(`/apikoa/detailMake/queryContractDetail?contractCode=${code}`);
}



export async function queryDepartmentDetail(ID){
    return request(`/api/detailMake/queryDepartmentDetail?ID=${ID}`);
}