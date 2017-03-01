import React, {PropTypes} from 'react';
import styles from './AppItem.css';
import {Card, Button, Icon, Popover, message, Modal} from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import InfoItem from '../InfoItem';

const {confirm} = Modal;

function AppItem({data, onClick, onDelete, onEdit}) {
  const {protocol, host} = window.location;
  const short_chain = `${protocol}//${host}/${data.short_chain}`;

  const clickCopy = (
    <CopyToClipboard text={short_chain} onCopy={() => message.info('复制成功')}>
      <Button icon="copy">点击复制</Button>
    </CopyToClipboard>
  );
  return (
    <div className={styles.normal}>
      <Card onClick={() => onClick && onClick(data)}>
        <div className={styles.item}>

          <div className={styles.avatar} style={{backgroundImage: `url(${data.icon})`}}/>

          <div className={styles.info}>
            <div className={styles.title}>
              <Icon style={{float: 'left', zoom: 1.3}}
                    type={data.type === 0 ? 'apple-o' : 'android'}/>
              {`${data.name}`}
            </div>
            <InfoItem title="包名: " content={data.package_name}/>
            <InfoItem title="版本: " content={`${data.version_name}(build ${data.version_code})`}/>
            <Popover content={clickCopy} placement="bottomLeft">
              <div><InfoItem title="链接: " content={short_chain}/></div>
            </Popover>
          </div>

          <div className={styles.btns}>
            <Button style={{marginBottom: 10}} icon="edit" shape="circle" onClick={
              e => {
                if (e.hasOwnProperty('cancalBubble')) {
                  e.cancalBubble = true;
                } else {
                  e.stopPropagation();
                }
                onEdit && onEdit(data);
              }
            }/>
            <Button icon="delete" shape="circle"
                    onClick={
                      e => {
                        if (e.hasOwnProperty('cancalBubble')) {
                          e.cancalBubble = true;
                        } else {
                          e.stopPropagation();
                        }
                        confirm({
                          title: 'Tip',
                          content: '确定删除此App？',
                          onOk() {
                            onDelete && onDelete(data)
                          }
                        })
                      }
                    }
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

AppItem.propTypes = {
  data: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
};

export default AppItem;
