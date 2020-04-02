import { Button,Card} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default class EditMakeHome extends Component {
  render() {
    return (
      <>
        <PageHeaderWrapper content="请选择要配置的模块">
        <Card>
        <Link to={{ pathname: "EditMake", query: { id: 0} }} style={{marginRight:50}}>
            <Button type="primary" >用户管理编辑页</Button >
        </Link>
        <Link to={{ pathname: "EditMake", query: { id: 1} }} style={{marginRight:50}}>
            <Button type="primary" >角色管理编辑页</Button >
        </Link>
        <Link to={{ pathname: "EditMake", query: { id: 2} }} style={{marginRight:50}}>
            <Button type="primary" >部门管理编辑页</Button >
        </Link>
        <Link to={{ pathname: "EditMake", query: { id: 3} }} style={{marginRight:50}}>
            <Button type="primary" >合作方管理编辑页</Button >
        </Link>
        <Link to={{ pathname: "EditMake", query: { id: 4} }} style={{marginRight:50}}>
            <Button type="primary" >合同管理编辑页</Button >
        </Link>
        <Link to={{ pathname: "EditMake", query: { id: 5} }} style={{marginRight:50}}>
            <Button type="primary" >公告管理编辑页</Button >
        </Link>
        </Card>
        </PageHeaderWrapper>
      </>
    );
  }
  
}


