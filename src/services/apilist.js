import request from '@/utils/request';
//queryListMakeSource,queryListSetting,queryUserList,userManageResetPWD
export async function queryCoopList(params) {
    return request(`/apikoa/listMake/queryCoopList?${params}`);
}

export async function queryContractList(params) {
    return request(`/apikoa/listMake/queryContractList?${params}`);
}

export async function queryTypeConfigureList(params) {
    return request(`/apikoa/listMake/queryTypeConfigureList?${params}`);
}
export async function queryListSetting(id) {
return request(`/api/listMake/queryListSetting?id=${id}`);
}

export async function queryUserList(params) {
    return request(`/apikoa/listMake/queryUserList?${params}`);
}

export async function userManageResetPWD(params) {
    return request('/api/listMake/userManageResetPWD', {
        method: 'POST',
        data: params,
      });
}

export async function userManageDelete(params) {
    return request('/api/listMake/userManageDelete', {
        method: 'POST',
        data: params,
      });
}

export async function coopManageDelete(params) {
    return request('/api/listMake/coopManageDelete', {
        method: 'POST',
        data: params,
      });
}

export async function queryRoleList(params) {
    return request(`/api/listMake/queryRoleList?${params}`);
}

export async function queryDepartmentList(params) {
    return request(`/api/listMake/queryDepartmentList?${params}`);
}

export async function roleManageDelete(params) {
    return request('/api/listMake/roleManageDelete', {
        method: 'POST',
        data: params,
      });
}

export async function departmentManageDelete(params) {
    return request('/api/listMake/departmentManageDelete', {
        method: 'POST',
        data: params,
      });
}

export async function queryCheckList(params) {
    return request(`/apikoa/listMake/queryCheckList?${params}`);
}