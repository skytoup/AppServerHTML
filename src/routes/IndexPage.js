import React from 'react';
import {connect} from 'dva';
import styles from './IndexPage.css';
import {Breadcrumb, Spin, Layout} from 'antd';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const {Content} = Layout;

function IndexPage({loading, routes, params, children}) {
  return (
    <Layout className={styles.normal}>
      <Spin tip="Loading..." spinning={loading}>
        <Header title="AppServer"/>

        <Content className={styles.content}>
          <Breadcrumb routes={routes} params={params}/>
          <div className={styles.container}>{children}</div>
        </Content>

        <Footer/>
      </Spin>
    </Layout>
  );
}

IndexPage.propTypes = {};

function mapStateToProps(state) {
  const loading = state.loading.global;
  return {loading};
}

export default connect(mapStateToProps)(IndexPage);
