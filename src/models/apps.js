import * as app from '../services/app';
import {message} from 'antd';

export default {
  namespace: 'apps',
  state: {
    datas: [], // 数据
    page: 1, // 页码
    time: 0, // 获取第一页数据的时间
    type: 'all', // all iOS android
    hasMore: false, // 是否有更多的数据
    isLoadingMore: false, // 是否在加载更多
  },
  reducers: {
    saveType(state, {payload: {type}}) {
      return {...state, type};
    },
    saveDatas(state, {payload: {datas, time}}) {
      return {...state, datas, page: 1, time, hasMore: true};
    },
    addPackage(state, {payload: {data}}) {
      return {...state, datas: [data, ...state.datas]};
    },
    editApp(state, {payload: {id, modify}}) {
      const datas = state.datas.map(app => {
        if (app.id === id) {
          return {...app, ...modify};
        }
        return app;
      });
      return {...state, datas}
    },
    loadMoreData(state, {payload: {datas}}) {
      const ds = state.datas.concat(datas);
      return {...state, datas: ds, page: state.page + 1};
    },
    startLoadMore(state, payload) {
      return {...state, isLoadingMore: true};
    },
    endLoadMore(state, payload) {
      return {...state, isLoadingMore: false};
    },
    notMore(state, payload) {
      return {...state, hasMore: false}
    },
    deleteData(state, {payload: {id}}) {
      const datas = state.datas.filter(d => d.id !== id);
      return {...state, datas};
    },
  },
  effects: {
    *switchType({payload: {newType}}, {put, call, select}) {
      const {type: oldType} = yield select(state => state.apps);
      if (oldType === newType) {
        return;
      }
      yield put({type: 'saveType', payload: {type: newType}});
      yield put({type: 'fetch'});
    },
    *fetch({payload}, {put, call, select}) {
      const {type} = yield select(state => state.apps);
      const time = new Date().getTime();

      const result = yield app.fetch(type, 1, time);
      if (!result.ok) {
        result.showError();
        return
      }
      yield put({type: 'saveDatas', payload: {datas: result.datas, time}});
    },
    *loadMore(payload, {put, call, select}) {
      const {page, time, type} = yield select(state => state.apps);
      yield put({type: 'startLoadMore'});
      const result = yield app.fetch(type, page + 1, time);
      yield put({type: 'endLoadMore'});
      if (!result.ok) {
        result.showError();
        return
      }
      if (result.datas.length === 0) {
        yield put({type: 'notMore'});
      } else {
        yield put({type: 'loadMoreData', payload: {datas: result.datas}});
      }
    },
    *addUploadPackage({payload}, {put, call, select}) {
      yield put({type: 'addPackage', payload})
    },
    *delete({payload: {id}}, {put, call, select}) {
      const result = yield app.del(id);
      if (!result.ok) {
        result.showError();
        return;
      }
      message.success('删除成功');
      yield put({type: 'deleteData', payload: {id}})
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      // console.log(history);
      // return history.listen(({pathname}) => {
      //   if (pathname === '/') {
      //     dispatch({type: 'fetch', payload: {page: 1, type: 'all', keywords: null}})
      //   }
      // });
    },
  }
};
