import React, {PropTypes} from 'react';
import styles from './AppInfoList.css';
import {Timeline, Button} from 'antd';

import AppInfoItem from './AppInfoItem';

function AppInfoList({datas, hasMore, isLoadingMore, onLoadMore, onItemDelete, onItemDownload}) {
  return (
    <div className={styles.normal} style={{marginTop: 15}}>
      {datas.length === 0 ? (<div>暂无数据</div>) :
        (<Timeline
          pending={<Button disabled={!hasMore} icon={hasMore ? 'plus' : 'smile-o'} loading={isLoadingMore}
                           onClick={() => onLoadMore && onLoadMore()}>
            {hasMore ? 'see more' : 'not more'}
          </Button>}
        >
          {datas.map(
            data =>
              (
                <Timeline.Item key={data.id}>
                  <AppInfoItem data={data} onDelete={onItemDelete} onDownload={onItemDownload}/>
                </Timeline.Item>
              )
          )}
        </Timeline>)
      }
    </div>
  );
}

AppInfoList.propTypes = {
  data: PropTypes.array.require,
  hasMore: PropTypes.bool.require,
  isLoadingMore: PropTypes.bool.require,
  onLoadMore: PropTypes.bool.require,
  onItemDelete: PropTypes.func,
  onItemDownload: PropTypes.func,
};

export default AppInfoList;
