import * as apps from '../services/app';
import * as appVersions from '../services/appVersion';
import {message} from 'antd';

export default {
  namespace: 'appInfo',
  state: {
    data: {},
    datas: [],
    time: 0, // 获取第一页数据的时间
    hasMore: false, // 是否有更多数据
    isLoadingMore: false, // 是否在加载更多
  },
  reducers: {
    saveAppInfo(state, {payload: {data}}) {
      return {...state, data, versions: []};
    },
    editApp(state, {payload: {id, modify}}) {
      if (state.data.id === id) {
        return {...state, data: {...state.data, ...modify}};
      } else {
        return state
      }
    },
    saveDatas(state, {payload:{datas, time}}) {
      return {...state, datas, page: 1, time, hasMore: true};
    },
    loadMoreDatas(state, {payload:{datas}}) {
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
    *enterInfo({payload: {router, data}}, {put, call, select}) {
      yield put({type: 'saveAppInfo', payload: {data}});
      router.push({pathname: `app/${data.id}`});
    },
    *fetch(payload, {put, call, select}) {
      const {data} = yield select(state => state.appInfo);
      const time = new Date().getTime();
      const result = yield appVersions.fetch(data.id, 1, time);
      if (!result.ok) {
        result.showError();
        return
      }
      yield put({type: 'saveDatas', payload: {datas: result.datas, time}});
    },
    *loadMore(payload, {put, call, select}) {
      const {data, page, time} = yield select(state => state.appInfo);
      yield put({type: 'startLoadMore'});
      const result = yield appVersions.fetch(data.id, page + 1, time);
      yield put({type: 'endLoadMore'});
      if (!result.ok) {
        result.showError();
        return
      }
      if (result.datas.length === 0) {
        yield put({type: 'notMore'});
      } else {
        yield put({type: 'loadMoreDatas', payload: {datas: result.datas}});
      }
    },
    *loadData({payload: {id}}, {put, call, select}) {
      const result = yield apps.get(id);
      if (!result.ok) {
        result.showError();
        return;
      }
      yield put({type: 'saveAppInfo', payload: {data: result.datas}});
      yield put({type: 'fetch'});
    },
    *delete({payload: {id}}, {put, call, select}) {
      const {data} = yield select(state => state.appInfo);
      const result = yield appVersions.del(data.id, id);
      if (!result.ok) {
        result.showError();
        return
      }
      message.success('删除成功');
      yield put({type: 'deleteData', payload: {id}})
    },
  },
  subscriptions: {},
};
