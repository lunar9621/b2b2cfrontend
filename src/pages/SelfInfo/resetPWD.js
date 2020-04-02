import React from 'react';
import { connect } from 'dva';
import { Card, Form, Input, InputNumber, Button, Radio, message, Select, Upload, Icon, Table, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import styles from './SelfInfo.less';

const FormItem = Form.Item;

@connect(state => ({
  infoObj: state.selfinfo.data.obj,
  loading: state.selfinfo.loading,
  submitLoading: state.selfinfo.submitLoading,
  res: state.selfinfo.actionres,
}))
@Form.create()
export default class SelfInfo extends React.Component {

  state = {
    fileList: [],
  }
  
  componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch({
      type: 'selfinfo/fetchSelfInfo',
      callback: () => {
        if(this.props.infoObj.wechatUrl) {
          this.setState({
            fileList: [{
              uid: -1,
              name: '微信二维码',
              status: 'done',
              url: this.props.infoObj.wechatUrl,
            }],
          });
        }
      },
    });
  }

  modifyPasswd = (values) => {
    this.props.dispatch({
      type: 'selfinfo/fetchModifyPasswd',
      payload: values,
      callback: () =>　{
        const { success, msg } = this.props.res;
        if(success) message.success(msg);
        else message.error(msg);
      },
    });
  }

  handleChange = (info) => {
    let fileList = info.fileList;
    fileList = fileList.slice(-1);
    //1. filter status is not error
    fileList = fileList.filter((file) => {
      if (file.status === 'error') {
        return false;
      }
      return true;
    });
    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.obj[0];
      }
      return file;
    });
    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.success === true;
      }
      return true;
    });
    this.setState({ fileList });
  }

  handleBeforeUpload = (file) => {
    //限制图片 格式
    const isJPG = file.type === 'image/jpeg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';

    if (!(isJPG || isJPEG || isGIF || isPNG)) {
      message.error("上传图片的格式不正确，不是JPG、JPEG、GIF、PNG");

    } 
    return new Promise((resolve, reject) => {
      if (!(isJPG || isJPEG || isGIF || isPNG)) {
        reject(file);
      } else {
        resolve(file);
      }
    });  
  }

  modifyPasswd = (values) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        delete values.repasswd;
        this.props.dispatch({
          type: 'selfinfo/fetchModifyPasswd',
          payload: values,
          callback: () =>　{
            const { success, msg } = this.props.res;
            if(success) message.success(msg);
            else message.error(msg);
          },
        });
      }
    });
   
  }

  render() {
    const { loading, infoObj, submitLoading } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.card}>
        <Form layout='horizontal' onSubmit={this.modifyPasswd}>
            <FormItem
              {...formItemLayout}
              label="原密码"
            >
              {
                getFieldDecorator('oldPassword', {
                  // rules: [{ required: true, message: '请输入原密码',
                  // }, {validator: this.isLastRule}],
                  rules: [{ required: true, message: '请输入原密码' }],
                })(<Input type='password' placeholder="请输入原密码" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="新密码"
            >
              {
                getFieldDecorator('password',{
                  rules: [{
                    required: true, message: '新密码为必填项',
                  }],
                })(<Input type='password' placeholder="请输入新密码" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="再次输入"
            >
              {
                getFieldDecorator('repasswd', {
                  rules: [{ required: true, message: '请再次输入以确认新密码',
                  }, { validator: this.repeatRule }],
                })(<Input type='password' placeholder="请再次输入新密码" />)
              }
            </FormItem>
            <FooterToolbar>
              <Button type="primary" htmlType="submit" loading={submitLoading}>保存</Button >
              <Link to={{ pathname: "resetPWD", query: { id: 0} }} style={{marginRight:12}}>
                  <Button type="primary" >修改密码</Button >
              </Link>
            </FooterToolbar>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }

}