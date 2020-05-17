import request from '@/utils/request';
//queryListMakeSource,queryListSetting
export async function queryUserEdit(params){
    return request(`/api/editMake/queryUserEdit?ID=${JSON.stringify(params)}`);
}

export async function saveUserEdit(params) {
    return request('/api/editMake/saveUserEdit', {
        method: 'POST',
        data: params,
      });
}

export async function saveNewUser(params) {
    return request('/api/editMake/saveNewUser', {
        method: 'POST',
        data: params,
      });
}
//RoleManage
export async function queryRoleEdit(params){
    return request(`/api/editMake/queryRoleEdit?ID=${params}`);
}


export async function saveRoleEdit(params) {
    return request('/api/editMake/saveRoleEdit', {
        method: 'POST',
        data: params,
      });
}

export async function saveNewRole(params) {
    return request('/api/editMake/saveNewRole', {
        method: 'POST',
        data: params,
      });
}

export async function queryAuthTree(params) {
    return request('/api/editMake/queryAuthTree', {
        method: 'POST',
        data: params,
      });
}

export async function submitAuth(params) {
    return request('/api/editMake/submitAuth', {
        method: 'POST',
        data: params,
      });
}
//DepartmentManage
export async function queryDepartmentEdit(params){
    return request(`/api/editMake/queryDepartmentEdit?ID=${params}`);
}


export async function saveDepartmentEdit(params) {
    return request('/api/editMake/saveDepartmentEdit', {
        method: 'POST',
        data: params,
      });
}

export async function saveNewDepartment(params) {
    return request('/api/editMake/saveNewDepartment', {
        method: 'POST',
        data: params,
      });
}
//CoopManage
export async function queryCoopEdit(params){
    return request(`/apikoa/editMake/queryCoopEdit?coopID=${params}`);
}

export async function queryCoopNewProper(params){
  return request(`/apikoa/editMake/queryCoopNewProper?typeID=${params}`);
}


export async function saveCoopEdit(params) {
    return request('/api/editMake/saveCoopEdit', {
        method: 'POST',
        data: params,
      });
}

export async function saveNewCoop(params) {
    return request('/api/editMake/saveNewCoop', {
        method: 'POST',
        data: params,
      });
}
//saveTypeConfigureEdit,saveNewTypeConfigure,queryTypeConfigureEdit
export async function queryTypeConfigureEdit(ID){
    return request(`/apikoa/editMake/queryTypeConfigureEdit?typeID=${ID}`);
}

export async function saveTypeConfigureEdit(params) {
    return request('/apikoa/editMake/saveTypeConfigureEdit', {
      method: 'POST',
      data: params,
    });
  }

  export async function saveNewTypeConfigure(params) {
    return request('/apikoa/editMake/saveNewTypeConfigure', {
      method: 'POST',
      data: params,
    });
  }