/**
 * Created by apple on 2017/2/7.
 */
import request from '../utils/request';

const urlBase = 'apps/';

export async function fetch(type, page, time) {
  return await request(`${urlBase}${type}/page/${page}?t=${time / 1000}`);
}

export async function del(id) {
  return await request(`${urlBase}${id}`, {method: 'DELETE'});
}

export async function get(id) {
  return await request(`${urlBase}${id}`)
}

export async function put(id, param) {
  return await request(`${urlBase}${id}`, {method: 'PUT', body: param})
}
