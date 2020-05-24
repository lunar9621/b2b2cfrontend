import {queryUserEdit,queryRoleEdit,queryDepartmentEdit,queryTypeConfigureEdit,queryCoopEdit,saveUserEdit,saveNewUser,saveRoleEdit,saveNewRole,
  queryAuthTree,submitAuth,saveDepartmentEdit,saveNewDepartment,saveCoopEdit,saveNewCoop,saveNewTypeConfigure,saveTypeConfigureEdit,queryCoopNewProper,contractPay,SubmitToAudit,
  saveAuditResult} from '@/services/apiedit';
const ManageEditModel = {
  namespace: 'ManageEditModel',
  state: {
    dataEdit: {
      success: "",
      msg: "",
      obj: {
      },
    },
    dataNewProper: {
      success: "",
      msg: "",
      obj: {
      },
    },
    authTree: {
      success: "false",
      msg: "error",
      obj: [],
    },
    datachange:{
      success:"",
      msg:"",
    },
    loading:true,
    submitLoading: false,
  },
  effects: {
    *fetchUserEdit({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      console.log("entermodel",payload);
      const data = yield call(queryUserEdit,payload); 
      yield put({
        type: 'saveDataEdit',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *fetchRoleEdit({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      console.log("entermodel",payload);
      const data = yield call(queryRoleEdit,payload); 
      yield put({
        type: 'saveDataEdit',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *fetchDepartmentEdit({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      console.log("entermodel",payload);
      const data = yield call(queryDepartmentEdit,payload); 
      yield put({
        type: 'saveDataEdit',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *fetchCoopNewProper({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      console.log("entermodel",payload);
      const data = yield call(queryCoopNewProper,payload); 
      yield put({
        type: 'saveDataNewProper',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *fetchCoopEdit({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      console.log("entermodel",payload);
      const data = yield call(queryCoopEdit,payload); 
      yield put({
        type: 'saveDataEdit',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *fetchAuthTree({ payload, callback }, { call, put }) {
      yield put({
        type: 'dataLoading',
        payload: true,
      });
      const response = yield call(queryAuthTree, payload);
      yield put({
        type:'saveAuthTree',
        payload: response,
      });
      yield put({
        type:'dataLoading',
        payload: false,
      });
      if (callback) callback();
    },

    *SubmitToAudit({ payload, callback }, { call, put }) {
      yield put({
        type: 'dataLoading',
        payload: true,
      });
      const response = yield call(SubmitToAudit, payload);
      yield put({
        type:'saveAuthTree',
        payload: response,
      });
      yield put({
        type:'dataLoading',
        payload: false,
      });
      if (callback) callback();
    },

    *fetchTypeConfigureEdit({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      console.log("entermodel",payload);
      const data = yield call(queryTypeConfigureEdit,payload); 
      yield put({
        type: 'saveDataEdit',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *contractPay({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(contractPay, payload);
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

    *saveNewTypeConfigure({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(saveNewTypeConfigure, payload);
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

    *saveTypeConfigureEdit({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(saveTypeConfigureEdit, payload);
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

    *saveUserEdit({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(saveUserEdit, payload);
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

    *saveNewUser({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(saveNewUser, payload);
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


    *saveRoleEdit({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(saveRoleEdit, payload);
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

    *saveNewRole({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(saveNewRole, payload);
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

    *saveDepartmentEdit({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(saveDepartmentEdit, payload);
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

    *saveNewDepartment({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(saveNewDepartment, payload);
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

    *saveCoopEdit({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(saveCoopEdit, payload);
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

    *saveNewCoop({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(saveNewCoop, payload);
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

    *submitAuth({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(submitAuth, payload);
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

    *saveAuditResult({ payload,callback }, { call,put}) {
      yield put({
        type:'dataSubmitLoading',
        payload:true,
      })
      const data = yield call(saveAuditResult, payload);
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

    saveAuthTree(state, action) {
      return {
        ...state,
        authTree: action.payload,
      };
    },

    saveDataEdit(state, { payload }) {
      return {
        ...state,
        dataEdit: payload,
      };
    },

    saveDataNewProper(state, { payload }) {
      return {
        ...state,
        dataNewProper: payload,
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
export default ManageEditModel;
