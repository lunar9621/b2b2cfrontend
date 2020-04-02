import request from '@/utils/request';
//queryzhcnConfigure,queryzhtwConfigure,queryenusConfigure,queryptbrConfigure
export async function queryzhcnConfigure() {
    return request(`/api/localeConf/queryzhcnConf`);
}
export async function queryzhtwConfigure() {
    return request(`/api/localeConf/queryzhtwConf`);
}

export async function queryenusConfigure() {
    return request(`/api/localeConf/queryenusConf`);
}

export async function queryptbrConfigure() {
    return request(`/api/localeConf/queryptbrConf`);
}

export async function queryMyLocalConfigure() {
    return request(`/api/localeConf/querymylocalConf`);
}

export async function queryDetailSetting(id) {
return request(`/api/detailMake/queryDetailSetting?id=${id}`);
}
