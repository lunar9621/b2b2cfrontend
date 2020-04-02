import {queryUserEdit} from '@/services/apiedit';
const UserAndRoleModel = {
  namespace: 'UserAndRoleModel',
  state: {
    roleData: {
        success: "",
        msg: "",
        obj: {
        },
      },
    roleData: {
      success: "",
      msg: "",
      obj: {
      },
    },
    datachange:{
      success:"",
      msg:"",
    },
    loading:true,
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

    *deleteEvent({ payload,callback }, { call,put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(deleteEvent, payload);
      yield put({
        type: 'messageCall',
        payload: data,
      });
      yield put({
        type:'dataLoading',
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

    saveDataEdit(state, { payload }) {
      return {
        ...state,
        dataEdit: payload,
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
export default UserAndRoleModel;
