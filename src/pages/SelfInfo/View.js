import React from 'react';
import { connect } from 'dva';
import {router} from 'umi';
import { Link } from 'dva/router';
import { Card, Form, Input, InputNumber, Button, Radio, message, Select, Upload, Icon, Table, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import FooterToolbar from '../../components/FooterToolbar';

import styles from './SelfInfo.less';

const FormItem = Form.Item;



class View extends React.Component {

  state = {
    fileList: [],
  }
  
  componentDidMount() {
    // const { dispatch } = this.props;
     console.log("selfInfoprops",this.props);
    // this.props.dispatch({
    //   type: 'selfInfoModel/fetchSelfInfo',
    //   callback: () => {
    //     if(this.props.infoObj.wechatUrl) {
    //       this.setState({
    //         fileList: [{
    //           uid: -1,
    //           name: '微信二维码',
    //           status: 'done',
    //           url: this.props.infoObj.wechatUrl,
    //         }],
    //       });
    //     }
    //   },
    // });
    if(this.props.currentUser){
      this.setState({
                fileList: [{
                  uid: -1,
                  name: '微信二维码',
                  status: 'done',
                  url: this.props.currentUser.wechatUrl,
                }],
              });
    }
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

  submitHandler = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(err) return;
      if(this.state.fileList.length){
        values.wechatUrl = this.state.fileList[0].url;
      }
      else{
        delete  values.wechatUrl;
      }
      console.log("values",values);
      this.props.dispatch({
        type: 'selfInfoModel/fetchModify',
        payload: values,
        callback: () => {
          const { success, msg } = this.props.datachange;
          if(success){ message.success(msg);
             router.push({
            pathname: '/',
          });}
          else message.error(msg);
        },
      })
    });
  }

  render() {
    const { currentUser, submitLoading } = this.props;
    var userkeys=Object.keys(currentUser);
    console.log("renderprops",this.props);
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
          <div>
            {
              userkeys.length==0 ? <div style={{textAlign: 'center', marginTop: 30}}><Spin size="large" /></div> :
              <Form onSubmit={this.submitHandler} layout="horizontal" className={styles.disabledFormStyleBorder}>
                <FormItem 
                  label="用户名"
                  {...formItemLayout}
                >
                  {
                    getFieldDecorator('userName', {
                      initialValue: currentUser.userName,
                    })(<Input disabled placeholder="请输入用户名" />)
                  }
                </FormItem>
                <FormItem 
                  label="姓名"
                  {...formItemLayout}
                >
                  {
                    getFieldDecorator('name', {
                      initialValue: currentUser.name,
                    })(<Input disabled placeholder="请输入姓名" />)
                  }
                </FormItem>
                <FormItem 
                  label="角色"
                  {...formItemLayout}
                >
                  {
                    getFieldDecorator('role', {
                      initialValue: currentUser.role ? currentUser.role : null,
                    })(<Input disabled placeholder="请输入角色名" />)
                  }
                </FormItem>
                <FormItem 
                  label="部门"
                  {...formItemLayout}
                >
                  {
                    getFieldDecorator('department', {
                      initialValue: currentUser.department ? currentUser.department : null,
                    })(<Input disabled placeholder="请输入部门" />)
                  }
                </FormItem>
                <FormItem 
                  label="联系方式"
                  {...formItemLayout}
                >
                  {getFieldDecorator('mobile', {
                      initialValue: currentUser.mobile,
                    })(
                    <Input placeholder='请输入手机号' />
                  )}
                </FormItem>
                <FormItem 
                  label="QQ"
                  {...formItemLayout}
                >
                  {getFieldDecorator('qq', {
                      initialValue: currentUser.qq,
                    })(
                    <Input placeholder='请输入QQ号' />
                  )}
                </FormItem>
                <FormItem 
                  label="微信"
                  {...formItemLayout}
                >
                  {getFieldDecorator('wechat', {
                      initialValue: currentUser.wechat,
                    })(
                    <Input placeholder='请输入微信号' />
                  )}
                </FormItem>
                {/* <FormItem 
                  label="微信二维码"
                  {...formItemLayout}
                >
                  {getFieldDecorator('wechatUrl')(
                    <Upload
                      className={styles.uploadInline}
                      name="files"
                      action="/hyapi/resource/image/upload"
                      onChange={this.handleChange}
                      fileList={this.state.fileList}
                      beforeUpload={this.handleBeforeUpload}
                      headers={{'X-Requested-With' : null}}
                    >
                      <Button>
                        <Icon type="upload" />上传图片
                      </Button>
                    </Upload>
                  )}
                </FormItem> */}
                <FooterToolbar> <Button type="primary" htmlType="submit" loading={submitLoading}>保存</Button >
                    <Link to={{ pathname: "resetPWD", query: { id: 0} }} style={{marginLeft:12}}>
                        <Button type="primary" >修改密码</Button >
                    </Link>
            </FooterToolbar>
              </Form>
            }
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }

}

export default connect(({ selfInfoModel,login}) => ({
  // infoObj: selfInfoModel.data.obj,
  loading:selfInfoModel.loading,
  submitLoading: selfInfoModel.submitLoading,
  datachange: selfInfoModel.datachange,
  currentUser:login.currentUser,
}))(Form.create()(View))