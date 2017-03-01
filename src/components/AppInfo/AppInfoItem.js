import React, {PropTypes} from 'react';
import styles from './AppInfoItem.css';
import InfoItem from '../InfoItem';
import {Button, Popconfirm} from 'antd';
import date from '../../utils/date';

function AppInfoItem({data, onDelete, onDownload}) {
  const version = `${data.version_name}(build ${data.version_code})`;
  return (
    <div className={styles.normal}>
      <div>
        <div>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <InfoItem title="版本: " content={version}/>
            <div>
              <Button type="primary" style={{marginLeft: 15}} onClick={() => onDownload && onDownload(data)}>下载</Button>
              <Popconfirm title="确定删除该版本?" onConfirm={() => onDelete && onDelete(data.id)}>
                <Button style={{marginLeft: 15}}>删除</Button>
              </Popconfirm>
            </div>
          </div>
          <InfoItem title="大小: " content={data.size}/>
          <InfoItem title="更新: " content={date(data.create_at)}/>
          <div>{data.update_msg}</div>
        </div>
      </div>
    </div>
  );
}

AppInfoItem.propTypes = {
  data: PropTypes.object.require,
  onDelete: PropTypes.func,
  onDownload: PropTypes.func,
};

export default AppInfoItem;
