import { Alert, Checkbox, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

class ListMakeHome extends Component {
  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    return (
      <>
        <PageHeaderWrapper content="请选择要配置的模块">
        <Link to={{ pathname: "ListMake", query: { id: 0} }}>
            <Button type="primary" >用户管理列表页</Button >
        </Link>
        <Link to={{ pathname: "ListMake", query: { id: 1} }}>
            <Button type="primary" >角色管理列表页</Button >
        </Link>
        <Link to={{ pathname: "ListMake", query: { id: 2} }}>
            <Button type="primary" >部门管理列表页</Button >
        </Link>
        <Link to={{ pathname: "ListMake", query: { id: 3} }}>
            <Button type="primary" >合作方管理列表页</Button >
        </Link>
        <Link to={{ pathname: "ListMake", query: { id: 4} }} >
            <Button type="primary" >合同管理列表页</Button >
        </Link>
        <Link to={{ pathname: "ListMake", query: { id: 5} }} >
            <Button type="primary" >审核管理列表页</Button >
        </Link>
        </PageHeaderWrapper>
      </>
    );
  }
  
}


