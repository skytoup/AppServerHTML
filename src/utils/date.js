/**
 * Created by apple on 2017/2/9.
 */

const moment = require('moment');

export default function (time) {
  return moment((time + 28800) * 1000).format('YYYY-MM-DD HH:mm') // 加8小时
}
