const url = require('url');
import React from 'react';
import {connect} from 'dva';
import {Input, Button, message} from 'antd';
import styles from './AppEdit.css';

class AppEdit extends React.Component {
  constructor(props) {
    super(props);
    const {params, dispatch, data} = props;
    this.state = {};
  }

  render() {
    // const router = this.context.router;
    const {dispatch, data} = this.props;
    // const short_chain = (url.parse(data.short_chain || '').path || '').slice(1);
    const short_chain = data.short_chain || '';

    if (Object.keys(this.state).length === 0) {
      this.setState({...data})
    }

    if (short_chain === '') {
      return (<div/>)
    }
    const {protocol, host} = window.location;
    return (
      <div className={styles.normal}>
        <div>
          <div>
            <div className={styles.label}>名称</div>
            <Input size="large" placeholder="name" defaultValue={data.name}
                   onChange={e => this.state.name = e.target.value.trim()}/>
          </div>
          <div>
            <div className={styles.label}>短链</div>
            <Input size="large" placeholder="short chain(5-15, letters, numbers, underline)"
                   addonBefore={`${protocol}//${host}/`}
                   defaultValue={short_chain} onChange={e => this.state.short_chain = e.target.value.trim()}/>
          </div>
          <div>
            <div className={styles.label}>详情</div>
            <Input size="large" placeholder="detail(optional)" type="textarea" autosize={{minRows: 5, maxRows: 5}}
                   defaultValue={data.detail}
                   onChange={e => this.state.detail = e.target.value.trim()}/>
          </div>
          <Button style={{marginTop: 25, width: '100%'}} type="primary" htmlType="submit" size="large" onClick={() => {
            const {name, short_chain, detail}=this.state;
            {/*if (data.name === name && data.short_chain === short_chain && data.detail === detail) {*/
            }
            {/*message.warning('请修改后再进行提交');*/
            }
            {/*} */
            }
            if (name === '' || short_chain === '') {
              message.warning('app名称和短链不能为空');
            } else {
              let param = {};
              if (name !== data.name) {
                param.name = name
              }
              if (short_chain !== data.short_chain) {
                param.short_chain = short_chain
              }
              if (detail !== data.detail) {
                param.detail = detail
              }
              console.log(this.state, data, param);
              if (Object.keys(param).length === 0) {
                message.warning('请修改后再进行提交');
              } else {
                dispatch({type: 'appEdit/modify', payload: {id: data.id, param}})
              }
            }
          }}>修改</Button>
        </div>
      </div>
    );
  }

  static contextTypes = {
    router: React.PropTypes.object,
  };
}

function mapStateToProps(state) {
  const {data} = state.appInfo;
  return {
    data,
  };
}

export default connect(mapStateToProps)(AppEdit);
