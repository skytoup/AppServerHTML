import React, {PropTypes} from 'react';
import styles from './Header.css';
import {Layout} from 'antd';

function Header({title}) {
  return (
    <Layout.Header className={styles.normal}>
      <div className={styles.title}>{title}</div>
    </Layout.Header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
