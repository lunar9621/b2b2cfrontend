import {queryCoopDetail} from '@/services/apidetail';
const ManageDetailModel = {
  namespace: 'ManageDetailModel',
  state: {
    dataDetail: {
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
    *fetchCoopDetail({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      console.log("entermodel",payload);
      const data = yield call(queryCoopDetail,payload); 
      yield put({
        type: 'saveDataDetail',
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

    saveDataDetail(state, { payload }) {
      return {
        ...state,
        dataDetail: payload,
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
export default ManageDetailModel;
