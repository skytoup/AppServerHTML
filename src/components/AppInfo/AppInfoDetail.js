import React, {PropTypes} from 'react';
import styles from './AppInfoDetail.css';
import {Icon, Button, Popover, message} from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';

import InfoItem from '../../components/InfoItem';

function AppInfoDetail({data, onEdit}) {
  const {protocol, host} = window.location;
  const short_chain = data.short_chain === undefined ? '' : `${protocol}//${host}/${data.short_chain}`;

  const clickCopy = (
    <CopyToClipboard text={short_chain} onCopy={() => message.info('复制成功')}>
      <Button icon="copy">点击复制</Button>
    </CopyToClipboard>
  );
  return (
    <div className={styles.normal}>
      <QRCode className={styles.qrCode} value={short_chain}/>

      <div className={styles.info}>
        <div style={{flex: 1, marginRight: 10}}>
          <div className={styles.title}>
            <Icon style={{zoom: 1.3}} type={data.type === 0 ? 'apple-o' : 'android'}/>
            {`${data.name || ''}`}
          </div>
          <InfoItem title="包名: " content={data.package_name || ''}/>
          <Popover content={clickCopy} placement="bottomLeft">
            <div>
              <InfoItem title="链接: " content={short_chain || ''}/>
            </div>
          </Popover>

          <div className={styles.detail}>{data.detail || ''}</div>
        </div>

        <div className={styles.btns}>
          <Button disabled={short_chain === ''} icon="edit" size="large" onClick={() => onEdit && onEdit()}>编辑</Button>
          {/*<Button icon="download" size="large" type="primary">下载</Button>*/}
        </div>

      </div>
    </div>
  );
}

AppInfoDetail.propTypes = {
  data: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
};

export default AppInfoDetail;
