import {queryDetailMakeSource,queryDetailSetting,queryDetailTimestamp} from '@/services/apidetailMake';
const detailMakeModel = {
  namespace: 'detailMakeModel',
  state: {
    dataSource: {
      success:"",
      msg:"",
      obj:{}, 
    },
    detailSetting:{
      success:"",
      msg:"",
      obj:{},
    },
    detailTimestamp:{
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
    *fetchDetailMakeSource({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(queryDetailMakeSource,payload); 
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

    *fetchDetailSetting({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(queryDetailSetting,payload); 
      yield put({
        type: 'saveDetailSetting',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    *fetchDetailTimestamp({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(queryDetailTimestamp,payload); 
      yield put({
        type: 'saveDetailTimestamp',
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

    saveDetailTimestamp(state, { payload }) {
      return {
        ...state,
        detailTimestamp: payload,
      };
    },

    saveDetailSetting(state, { payload }) {
      return {
        ...state,
        detailSetting: payload,
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
export default detailMakeModel;
