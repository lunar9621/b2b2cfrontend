import {queryCoopList,queryUserList,queryTypeConfigureList,userManageResetPWD,userManageDelete,queryRoleList,roleManageDelete,
  queryDepartmentList,departmentManageDelete,coopManageDelete} from '@/services/apilist';
const ManageListModel = {
  namespace: 'ManageListModel',
  state: {
    dataList: {
      success: "",
      msg: "",
      obj: {
          rows: [],
          pageSize: null,
          pageNumber: null,
          total: null,
      },
    },
    datachange:{
      success:"",
      msg:"",
    },
    loading:true,
    submitLoading: false,
  },
  effects: {
    *fetchTypeConfigureList({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      console.log("entermodel",payload);
      const data = yield call(queryTypeConfigureList,payload); 
      yield put({
        type: 'saveDataList',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *fetchCoopList({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      console.log("entermodel",payload);
      const data = yield call(queryCoopList,payload); 
      yield put({
        type: 'saveDataList',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *fetchListSetting({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(queryListSetting,payload); 
      yield put({
        type: 'saveListSetting',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *fetchUserList({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      console.log("entermodel",payload);
      const data = yield call(queryUserList,payload); 
      yield put({
        type: 'saveDataList',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *userManageResetPWD({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(userManageResetPWD, payload);
      yield put({
        type: 'messageCall',
        payload: data,
      });
      yield put({
        type:'dataSubmitLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *userManageDelete({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(userManageDelete, payload);
      yield put({
        type: 'messageCall',
        payload: data,
      });
      yield put({
        type:'dataSubmitLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *fetchRoleList({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      console.log("entermodel",payload);
      const data = yield call(queryRoleList,payload); 
      yield put({
        type: 'saveDataList',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

     *roleManageDelete({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(roleManageDelete, payload);
      yield put({
        type: 'messageCall',
        payload: data,
      });
      yield put({
        type:'dataSubmitLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *fetchDepartmentList({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      console.log("entermodel",payload);
      const data = yield call(queryDepartmentList,payload); 
      yield put({
        type: 'saveDataList',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *departmentManageDelete({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(departmentManageDelete, payload);
      yield put({
        type: 'messageCall',
        payload: data,
      });
      yield put({
        type:'dataSubmitLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *coopManageDelete({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(coopManageDelete, payload);
      yield put({
        type: 'messageCall',
        payload: data,
      });
      yield put({
        type:'dataSubmitLoading',
        payload:false,
      })
      if(callback) callback();
    },
  },
  reducers: {
    dataLoading(state,{payload}){
      return {
        ...state,
        loading:payload,
      };
    },

    dataSubmitLoading(state,{payload}){
      return {
        ...state,
        submitLoading:payload,
      };
    },

    saveDataList(state, { payload }) {
      return {
        ...state,
        dataList: payload,
      };
    },

    saveListSetting(state, { payload }) {
      return {
        ...state,
        listSetting: payload,
      };
    },

    messageCall(state,{payload}){
      return {
        ...state,
        datachange:payload,
      }
    }
  },
};
export default ManageListModel;
