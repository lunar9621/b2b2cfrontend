import {queryUserEdit,saveUserEdit} from '@/services/apiedit';
const ManageEditModel = {
  namespace: 'ManageEditModel',
  state: {
    dataEdit: {
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
export default ManageEditModel;
