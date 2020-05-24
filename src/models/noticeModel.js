import { queryNotices,queryNoticeDetail } from '@/services/user';
const noticeModel = {
  namespace: 'noticeModel',
  state: {
    collapsed: false,
    noticeList: {
      success:true,
      msg:'',
      obj:{},
    },
    noticeDetail: {
      success: "",
      msg: "",
      obj: {
      },
    },
    noticeLoading:true,
  },
  effects: {
    *fetchNotices(_, { call, put, select }) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
    },

    *fetchNoticeDetail({payload,callback}, { call, put}) {
      yield put({
        type:'dataLoading',
        payload:true,
      })
      const data = yield call(queryNoticeDetail,payload);
      yield put({
        type: 'saveNoticeDetail',
        payload: data,
      });
      yield put({
        type:'dataLoading',
        payload:false,
      })
    },

    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },

    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };

          if (notice.id === payload) {
            notice.read = true;
          }

          return notice;
        }),
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },
  reducers: {
    dataLoading(state,{payload}){
      return {
        ...state,
        noticeLoading:payload,
      };
    },

    changeLayoutCollapsed(
      state = {
        noticeList: {},
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },

    saveNotices(state, { payload }) {
      return {
        ...state,
        noticeList: payload,
      };
    },

    saveNoticeDetail(state, { payload }) {
      return {
        ...state,
         noticeDetail: payload,
      };
    },

    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default noticeModel;
