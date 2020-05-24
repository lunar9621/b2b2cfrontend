import {queryzhcnConfigure,queryzhtwConfigure,queryenusConfigure,queryptbrConfigure,queryLocalConfigure,queryMyLocalConfigure,
  saveLocaleConf} from '@/services/apilocaleConf';
const localeConfModel = {
  namespace: 'localeConfModel',
  state: {
    dataLocal: {
      success:"",
      msg:"",
      obj:{  }, 
    },
    dataMyLocal: {
      success:"",
      msg:"",
      obj:{  }, 
    },
    // dataZhcn: {
    //   success:"",
    //   msg:"",
    //   obj:{}, 
    // },
    // dataZhtw: {
    //   success:"",
    //   msg:"",
    //   obj:{}, 
    // },
    // dataPtbr: {
    //   success:"",
    //   msg:"",
    //   obj:{}, 
    // },
    // dataEnus: {
    //   success:"",
    //   msg:"",
    //   obj:{}, 
    // },
    // dataMyLocal:{
    //   success:"",
    //   msg:"",
    //   obj:{}, 
    // },
    datachange:{
      success:"",
      msg:"",
    },
    loading:true,
  },
  effects: {
    *fetchLocalConfigure({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(queryLocalConfigure,payload); 
      yield put({
        type: 'saveLocalConfigure',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    // *fetchzhtwConfigure({payload,callback}, { call, put}) {
    //   yield put({
    //     type:'dataLoading',
    //     payload:true,
    //   })
    //   const data = yield call(queryzhtwConfigure,payload); 
    //   yield put({
    //     type: 'savezhtwConfigure',
    //     payload: data,
    //   });
    //   yield put({
    //     type:'dataLoading',
    //     payload:false,
    //   })
    //   if(callback) callback();
    // },

    // *fetchenusConfigure({payload,callback}, { call, put}) {
    //   yield put({
    //     type:'dataLoading',
    //     payload:true,
    //   })
    //   const data = yield call(queryenusConfigure,payload); 
    //   yield put({
    //     type: 'saveenusConfigure',
    //     payload: data,
    //   });
    //   yield put({
    //     type:'dataLoading',
    //     payload:false,
    //   })
    //   if(callback) callback();
    // },

    // *fetchptbrConfigure({payload,callback}, { call, put}) {
    //   yield put({
    //     type:'dataLoading',
    //     payload:true,
    //   })
    //   const data = yield call(queryptbrConfigure,payload); 
    //   yield put({
    //     type: 'saveptbrConfigure',
    //     payload: data,
    //   });
    //   yield put({
    //     type:'dataLoading',
    //     payload:false,
    //   })
    //   if(callback) callback();
    // },

    *fetchMyLocalConfigure({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(queryMyLocalConfigure,payload); 
      yield put({
        type: 'savemyLocalConfigure',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
      if(callback) callback();
    },

    

    *saveLocaleConf({ payload,callback }, { call,put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(saveLocaleConf, payload);
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

    saveLocalConfigure(state, { payload }) {
      return {
        ...state,
        dataLocal: payload,
      };
    },

    // savezhtwConfigure(state, { payload }) {
    //   return {
    //     ...state,
    //     dataZhtw: payload,
    //   };
    // },

    // saveenusConfigure(state, { payload }) {
    //   return {
    //     ...state,
    //     dataEnus: payload,
    //   };
    // },

    // saveptbrConfigure(state, { payload }) {
    //   return {
    //     ...state,
    //     dataPtbr: payload,
    //   };
    // },

    savemyLocalConfigure(state, { payload }) {
      return {
        ...state,
        dataMyLocal: payload,
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
export default localeConfModel;
