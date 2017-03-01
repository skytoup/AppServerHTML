import fetch from 'dva/fetch';
import {message} from 'antd';

class RequestResult {
  static ok(datas = null) {
    return new RequestResult(true, datas, null);
  }

  static notOk(error = null) {
    return new RequestResult(false, null, error);
  }

  constructor(ok, datas, error) {
    this.ok = ok;
    this.datas = datas;
    this.error = error;
  }

  showError() {
    message.error(this.error.message);
  }
}

function checkResult(json) {
  if (json.code === 0) {
    return RequestResult.ok(json.datas);
  }

  const error = new Error(json.msg, json.code);
  error.json = json;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  return await fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkResult)
    .catch(err => RequestResult.notOk(err));
}
