import React from 'react';
import styles from './Footer.css';
import {Layout} from 'antd';

function Footer() {
  return (
    <Layout.Footer className={styles.normal}>
      <div>
        power by <a href="http://skytoup.wicp.net">skytoup</a>
      </div>
      <a href="https://github.com/skytoup/AppServer">project: https://github.com/skytoup/AppServer</a>
    </Layout.Footer>
  );
}

export default Footer;
