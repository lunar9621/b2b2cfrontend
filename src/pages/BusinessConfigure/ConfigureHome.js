import { Button,Card} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default class ConfigureHome extends Component {
  render() {
    return (
      <>
        <PageHeaderWrapper content="请选择要配置的模块">
          <Card>
        <Link to={{ pathname: "BusinessConfigure/BusinessMake",query:{id: 0 }}} style={{marginRight:50}}>
            <Button type="primary" >供应商管理</Button >
        </Link>
        <Link to={{ pathname: "BusinessConfigure/BusinessMake", query:{id: 1 }}} style={{marginRight:50}}>
            <Button type="primary" >渠道管理</Button >
        </Link>
        <Link to={{ pathname: "BusinessConfigure/BusinessMake", query: { id: 2} }} style={{marginRight:50}}>
            <Button type="primary" >合同管理</Button >
        </Link>
        </Card>
        </PageHeaderWrapper>
      </>
    );
  }
  
}


