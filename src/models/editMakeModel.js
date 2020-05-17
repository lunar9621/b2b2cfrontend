import {queryEditMakeSource,queryEditSetting,queryEditTimestamp,saveEditSetting} from '@/services/apieditMake';
const editMakeModel = {
  namespace: 'editMakeModel',
  state: {
    dataSource: {
      success:"",
      msg:"",
      obj:{}, 
    },
    editSetting:{
      success:"",
      msg:"",
      obj:{},
    },
    editTimestamp:{
      success:"",
      msg:"",
      obj:{},
    },
    datachange:{
      success:"",
      msg:"",
    },
    loading:true,
  },
  effects: {
    *fetchEditMakeSource({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(queryEditMakeSource,payload); 
      yield put({
        type: 'saveDataSource',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *fetchEditSetting({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(queryEditSetting,payload); 
      yield put({
        type: 'saveEditSetting',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },


    *fetchEditTimestamp({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(queryEditTimestamp,payload); 
      yield put({
        type: 'saveEditTimestamp',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *saveEditSetting({ payload,callback }, { call,put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(saveEditSetting, payload);
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

    saveDataSource(state, { payload }) {
      return {
        ...state,
        dataSource: payload,
      };
    },

    saveEditSetting(state, { payload }) {
      return {
        ...state,
        editSetting: payload,
      };
    },

    saveEditTimestamp(state, { payload }) {
      return {
        ...state,
        editTimestamp: payload,
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
export default editMakeModel;
