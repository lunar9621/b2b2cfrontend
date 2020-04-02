import {queryCoopList,queryUserList,userManageResetPWD,userManageDelete} from '@/services/apilist';
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
