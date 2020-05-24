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
        <Link to={{ pathname: "EditMake", query: { id: 0} }} >
            <Button type="primary" style={{marginRight:100}}>用户管理编辑页</Button >
        </Link>
        <Link to={{ pathname: "EditMake", query: { id: 1} }} >
            <Button type="primary" style={{marginRight:100}}>角色管理编辑页</Button >
        </Link>
        <Link to={{ pathname: "EditMake", query: { id: 2} }} >
            <Button type="primary" style={{marginRight:100}}>部门管理编辑页</Button >
        </Link>
        <Link to={{ pathname: "EditMake", query: { id: 3} }} >
            <Button type="primary" style={{marginRight:100}}>合作方管理编辑页</Button >
        </Link>
        <Link to={{ pathname: "EditMake", query: { id: 4} }} >
            <Button type="primary" style={{marginRight:100,marginTop:100}}>合同管理编辑页</Button >
        </Link>
        <Link to={{ pathname: "EditMake", query: { id: 5} }} >
            <Button type="primary" style={{marginRight:50,marginTop:100}}>公告管理编辑页</Button >
        </Link>
        </Card>
        </PageHeaderWrapper>
      </>
    );
  }
  
}


