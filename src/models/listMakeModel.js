import {queryListMakeSource,queryListNewMenu,queryListSetting,queryListTimestamp,saveListSetting} from '@/services/apilistMake';
const listMakeModel = {
  namespace: 'listMakeModel',
  state: {
    dataSource: {
      success:"",
      msg:"",
      obj:{}, 
    },
    newMenu: {
      success:"",
      msg:"",
      obj:{}, 
    },
    listSetting:{
      success:"",
      msg:"",
      obj:{},
    },
    listTimestamp:{
      success:"",
      msg:"",
      obj:{},
    },
    datachange:{
      success:"",
      msg:"",
    },
    loading:true,
    dataSourceLoading:true,
  },
  effects: {
    *fetchListNewMenu({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(queryListNewMenu,payload); 
      yield put({
        type: 'saveNewMenu',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },
    *fetchListMakeSource({payload,callback}, { call, put}) {
      yield put({
        type:'dataSourceLoading',
        payload:true,
      })
      const data = yield call(queryListMakeSource,payload); 
      yield put({
        type: 'saveDataSource',
        payload: data,
      });
      yield put({
        type:'dataSourceLoading',
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

    *fetchListTimestamp({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(queryListTimestamp,payload); 
      yield put({
        type: 'saveListTimestamp',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *saveListSetting({ payload,callback }, { call,put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(saveListSetting, payload);
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

    dataSourceLoading(state,{payload}){
      return {
        ...state,
        dataSourceLoading:payload,
      };
    },

    saveNewMenu(state, { payload }) {
      return {
        ...state,
        newMenu: payload,
      };
    },

    saveDataSource(state, { payload }) {
      return {
        ...state,
        dataSource: payload,
      };
    },

    saveListSetting(state, { payload }) {
      return {
        ...state,
        listSetting: payload,
      };
    },

    saveListTimestamp(state, { payload }) {
      return {
        ...state,
        listTimestamp: payload,
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
export default listMakeModel;
