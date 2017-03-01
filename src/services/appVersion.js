/**
 * Created by apple on 2017/2/9.
 */

import request from '../utils/request';

const urlBase = 'apps/';

export async function fetch(appID, page, time) {
  return await request(`${urlBase}${appID}/versions/page/${page}?t=${time / 1000}`);
}

export async function del(appID, versionID) {
  return await request(`${urlBase}${appID}/versions/${versionID}`, {method: 'DELETE'});
}
