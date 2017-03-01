import React from 'react';
import {connect} from 'dva';
import {message, Upload, Radio, Input, Icon, Button, BackTop, Modal, Progress} from 'antd';
import styles from './Apps.css';
import AppList from '../components/AppList/AppList'
// import {Link} from 'dva/router';

const {Button: RadioButton, Group: RadioGroup} = Radio;
const {Dragger} = Upload;

class Apps extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    const {dispatch, datas, type} = props;
    if (datas.length === 0) {
      dispatch({type: 'apps/fetch', payload: {page: 1, type: type, keywords: null}});
    }
  }

  render() {
    const router = this.context.router;
    const {dispatch, isLoadingMore, datas, hasMore, type, upload} = this.props;

    const hasData = datas.length !== 0;
    const more = hasMore && hasData;

    return (
      <div className={styles.normal}>
        <BackTop />
        <Modal visible={upload.willUpload}
               title={`上传 ${upload.fileName}`}
               onOk={e => this.onUpload()}
               onCancel={e => upload.uploading || this.onCancelUpload()}
               footer={[
                 <Button key="取消" size="large"
                         onClick={e => upload.uploading || this.onCancelUpload()}>取消</Button>,
                 <Button key="上传" type="primary" size="large" loading={upload.uploading}
                         onClick={e => this.onUpload()}>上传</Button>,
               ]}
        >
          {
            upload.uploading ?
              (<Progress percent={upload.percent} status="active"/>) :
              (<Input placeholder="更新说明(optional)" type="textarea" autosize={{minRows: 3, maxRows: 3}}
                      onChange={e => dispatch({type: 'upload/saveUploadMsg', payload: {msg: e.target.value}})}/>)
          }
        </Modal>
        <Dragger type="primary" className={styles.upload} showUploadList={false} name="package"
                 supportServerRender={true}
                 action="upload/app"
                 beforeUpload={ file => {
                   const fileName = file.name;
                   if (fileName.endsWith('.ipa') || fileName.endsWith('.apk')) {
                     return new Promise((resolve, reject) => {
                       dispatch({type: 'upload/willUpload', payload: {fileName, upload: resolve}});
                       return false;
                     });
                   } else {
                     message.warning('不支持上传该文件类型');
                     return false
                   }
                 } }
                 onChange={ info => {
                   const status = info.file.status;
                   if (status === 'done') {
                     dispatch({type: 'upload/cancelUpload'});
                     message.success(`${info.file.name} 文件上传成功.`);
                     dispatch({type: 'apps/fetch', payload: {page: 1, type: type, keywords: null}});
                   } else if (status === 'error') {
                     message.error(`${info.file.name} 文件上传失败.`);
                     dispatch({type: 'upload/cancelUpload'});
                   } else if (status === 'uploading' && info.event !== undefined) {
                     dispatch({type: 'upload/updatePercent', payload: {percent: info.event.percent}});
                   }
                 }}
                 data={{msg: upload.updateMsg}}
        >dragger upload</Dragger>

        <div style={{display: 'flex', flexWrap: 'nowrap'}}>
          <RadioGroup className={styles.radioGroup} defaultValue={type} size="large"
                      onChange={e => dispatch({type: 'apps/switchType', payload: {newType: e.target.value}})}>
            <RadioButton value="all"><Icon type="apple-o"/>/<Icon type="android"/> All</RadioButton>
            <RadioButton value="iOS"><Icon type="apple-o"/> iOS</RadioButton>
            <RadioButton value="android"><Icon type="android"/> Android</RadioButton>
          </RadioGroup>
          {/*<Input className={styles.search} placeholder="搜索"/>*/}
        </div>

        <AppList style={{marginTop: 10}} datas={datas}
                 onItemDelete={ data => dispatch({type: 'apps/delete', payload: {id: data.id}}) }
                 onItemEdit={ data => dispatch({type: 'appEdit/enterEdit', payload: {router, data}})}
                 onItemClick={ data => dispatch({type: 'appInfo/enterInfo', payload: {router, data}})}
        />
        <Button className={styles.loadMoreBtn} disabled={!more} icon={more ? 'plus' : 'smile-o'}
                loading={isLoadingMore}
                onClick={
                  () => dispatch({type: 'apps/loadMore'})
                }>
          {more ? '加载更多' : '没有更多了'}
        </Button>
      </div>
    )
      ;
  }

  onUpload() {
    const {dispatch} = this.props;
    dispatch({type: 'upload/startUpload'})
  }

  onCancelUpload() {
    const {dispatch} = this.props;
    dispatch({type: 'upload/cancelUpload'})
  }
}

function mapStateToProps(state) {
  const {datas, isLoadingMore, hasMore, type} = state.apps;
  return {
    datas,
    isLoadingMore,
    hasMore,
    type,
    upload: state.upload,
  };
}

export default connect(mapStateToProps)(Apps);
