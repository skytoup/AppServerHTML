const initState = {
  fileName: '', // 文件名
  willUpload: false, // 准备上传
  uploading: false, // 是否在上传
  updateMsg: '', // 更新的信息
  percent: 0, // 上传的百分比
  upload: null, // 上传的文件
};

export default {
  namespace: 'upload',
  state: initState,
  reducers: {
    willUpload(state, {payload: {fileName, upload}}) {
      return {...state, willUpload: true, fileName, upload};
    },
    cancelUpload(state, payload) {
      return initState;
    },
    saveUploadMsg(state, {payload: {msg}}) {
      return {...state, updateMsg: msg.trim()};
    },
    willUploading(state, payload) {
      return {...state, uploading: true,}
    },
    updatePercent(state, {payload: {percent}}) {
      return {...state, percent: Number(percent).toFixed(2)};
    }
  },
  effects: {
    * startUpload(payload, {select, put, call}) {
      yield put({type: 'willUploading'});
      const {upload} = yield select(state => state.upload);
      upload();
    },
  },
  subscriptions: {},
};
