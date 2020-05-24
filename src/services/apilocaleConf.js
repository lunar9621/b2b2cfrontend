import request from '@/utils/request';
//queryzhcnConfigure,queryzhtwConfigure,queryenusConfigure,queryptbrConfigure
export async function queryzhcnConfigure() {
    return request(`/apikoa/localeConf/queryzhcnConf`);
}
export async function queryzhtwConfigure() {
    return request(`/apikoa/localeConf/queryzhtwConf`);
}

export async function queryenusConfigure() {
    return request(`/apikoa/localeConf/queryenusConf`);
}

export async function queryptbrConfigure() {
    return request(`/apikoa/localeConf/queryptbrConf`);
}
//queryLocalConfigure
export async function queryLocalConfigure() {
    return request(`/apikoa/localeConf/queryLocalConf`);
}

export async function queryMyLocalConfigure() {
    return request(`/apikoa/localeConf/querymylocalConf`);
}
//saveLocaleConf
export async function saveLocaleConf(params) {
    return request('/apikoa/localeConf/saveLocaleConf', {
        method: 'POST',
        data: params,
      });
}
