import {saveMenuData} from '@/services/apiMenuConf';
const menuConfModel = {
  namespace: 'menuConfModel',
  state: {
    datachange:{
      success:"",
      msg:"",
    },
    loading:true,
  },
  effects: {

    *saveMenuData({ payload,callback }, { call,put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(saveMenuData, payload);
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
export default menuConfModel;
