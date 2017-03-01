import * as app from '../services/app';
import {message} from 'antd';

export default {
  namespace: 'appEdit',
  state: {},
  reducers: {},
  effects: {
    *enterEdit({payload: {router, data}}, {put, call, select}) {
      yield put({type: 'appInfo/saveAppInfo', payload: {data}});
      router.push({pathname: `app/${data.id}/edit`});
    },
    *modify({payload: {id, param}}, {put, call, select}) {
      const result = yield app.put(id, JSON.stringify(param));
      if (!result.ok) {
        result.showError();
        return;
      }
      yield put({type: 'appInfo/editApp', payload: {id, modify: param}});
      yield put({type: 'apps/editApp', payload: {id, modify: param}});
      message.success('修改成功');
    },
  },
  subscriptions: {},
};
