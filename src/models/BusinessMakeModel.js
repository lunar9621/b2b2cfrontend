import {saveBusinessMake} from '@/services/apiedit';
const BusinessMakeModel = {
  namespace: 'BusinessMakeModel',
  state: {
    datachange:{
      success:"",
      msg:"",
    },
    loading:true,
  },
  effects: {
    *saveBusinessMake({ payload,callback }, { call,put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(saveBusinessMake, payload);
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

    messageCall(state,{payload}){
      return {
        ...state,
        datachange:payload,
      }
    }
  },
};
export default BusinessMakeModel;
