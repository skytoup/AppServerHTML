import React from 'react';
import {connect} from 'dva';
import {BackTop} from 'antd';
import styles from './AppInfo.css';
import AppInfoDetail from '../components/AppInfo/AppInfoDetail';
import AppInfoList from '../components/AppInfo/AppInfoList';

class AppInfo extends React.Component {
  constructor(props) {
    super(props);
    const {params, dispatch, data} = props;
    if (data.id === undefined) {
      dispatch({type: 'appInfo/loadData', payload: params})
    } else {
      dispatch({type: 'appInfo/fetch'});
    }
  }

  render() {
    const router = this.context.router;
    const {children, dispatch, data, datas, hasMore, isLoadingMore} = this.props;
    const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && (data.type === 0) ;
    const tip = isiOS ? (
      <div style={{marginTop: 15}}>
        <a href="static/cer/ca.cer">Tip: iOS安装时应用时, 需要先安装证书, 请点击这里进行安装。iOS9以上还需要到设置里面信任证书</a>
      </div>
    ) : null;
    // 进入编辑界面时, 渲染的是children
    return children || (
        <div className={styles.normal}>
          <BackTop />
          <AppInfoDetail data={data} onEdit={() => router.push({pathname: `app/${data.id}/edit`})}/>
          {tip}
          <AppInfoList datas={datas} hasMore={hasMore} isLoadingMore={isLoadingMore}
                       onLoadMore={ () => dispatch({type: 'appInfo/loadMore'})}
                       onItemDelete={ (id) => dispatch({type: 'appInfo/delete', payload: {id}}) }
                       onItemDownload={d => {
                         window.location.href = isiOS ?
                           `itms-services://?action=download-manifest&url=${d.plist}` :
                           d.package;
                       }}
          />
        </div>
      );
  }

  static contextTypes = {
    router: React.PropTypes.object,
  };
}

function mapStateToProps(state) {
  const {data, datas, hasMore, isLoadingMore} = state.appInfo;
  return {
    data,
    datas,
    hasMore,
    isLoadingMore,
  };
}

export default connect(mapStateToProps)(AppInfo);
