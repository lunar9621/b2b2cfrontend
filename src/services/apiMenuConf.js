import request from '@/utils/request';
//queryzhcnConfigure,queryzhtwConfigure,queryenusConfigure,queryptbrConfigure
export async function saveMenuData(params) {
    return request('/apikoa/saveMenuData', {
        method: 'POST',
        data: params,
      });
}

