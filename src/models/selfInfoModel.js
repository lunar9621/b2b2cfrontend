import { querySelfInfo,saveUserInfoModify, saveUserModifyPSW } from '../services/apiselfInfo';

const selfInfoModel={
  namespace: 'selfInfoModel',

  state: {
    // data: {
    //   obj: {},
    //   success: null,
    //   msg: null,
    // },
    loading: true,
    submitLoading: false,
    datachange: {
      success: false,
      msg: 'error',
    },
  },

  effects: {
    // *fetchSelfInfo({ payload, callback }, { call, put }) {
    //   yield put({
    //     type: 'changeLoading',
    //     payload: true,
    //   });
    //   const res = yield call(querySelfInfo, payload);
    //     yield put({
    //       type: 'saveData',
    //       payload: res,
    //     });
    //   yield put({
    //     type: 'changeLoading',
    //     payload: false,
    //   });
    //   if (callback) callback();
    // },
    *fetchModify({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeSubmitLoading',
        payload: true,
      });
      const res = yield call(saveUserInfoModify, payload);
      yield put({
        type: 'messageCall',
        payload: res,
      });
      yield put({
        type: 'changeSubmitLoading',
        payload: false,
      });
      if (callback) callback();
    },
    *fetchModifyPasswd({ payload, callback }, { call, put }) {
      const res = yield call(saveUserModifyPSW, payload);
      yield put({
        type: 'messageCall',
        payload: res,
      });
      if (callback) callback();
    },
  },

  reducers: {
    changeLoading(state, { payload }) {
      return {
        ...state,
        loading: payload,
      };
    },
    changeSubmitLoading(state, { payload }) {
      return {
        ...state,
        submitLoading: payload,
      };
    },
    saveData(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    messageCall(state, { payload }) {
      return {
        ...state,
        datachange: payload,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default selfInfoModel;
