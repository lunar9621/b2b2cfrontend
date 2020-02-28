import {queryListMakeSource,deleteEvent,addEvent,updateEvent,clearCompleted,changeDoneStatus} from '@/services/todos';
const TodosModel = {
  namespace: 'listMakeModel',
  state: {
    dataSource: {
      success:"",
      msg:"",
      obj:{}
    },
    datachange:{
      success:"",
      msg:"",
    },
    loading:false,
  },
  effects: {
    *fetchListMakeSource({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(queryListMakeSource,payload); 
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

    *addEvent({ payload,callback }, { call,put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(addEvent, payload);
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

    *updateEvent({ payload,callback }, { call,put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(updateEvent, payload);
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

    *clearCompleted({ payload,callback }, { call,put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(clearCompleted, payload);
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

    *clearCompleted({ payload,callback }, { call,put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(clearCompleted, payload);
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

    *changeDoneStatus({ payload,callback }, { call,put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(changeDoneStatus, payload);
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

    messageCall(state,{payload}){
      return {
        ...state,
        datachange:payload,
      }
    }
  },
};
export default TodosModel;
