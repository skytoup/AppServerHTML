import React, {PropTypes} from 'react';
import styles from './AppList.css';
import AppItem from './AppItem';

function AppList({style, datas: dataSource, onItemClick, onItemDelete, onItemEdit}) {
  return (
    <div className={styles.normal} style={{...style}}>
      {dataSource && dataSource.length !== 0 ?
        dataSource.map(data => <AppItem data={data} key={data.id}
                                        onDelete={onItemDelete}
                                        onClick={onItemClick}
                                        onEdit={onItemEdit}/>)
        : <div>暂无数据</div>}
    </div>
  );
}

AppList.propTypes = {
  datas: PropTypes.array.isRequired,
  onItemClick: PropTypes.func,
  onItemDelete: PropTypes.func,
  onItemEdit: PropTypes.func,
};

export default AppList;
