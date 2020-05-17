import { Button,Card,Form,Select,Input,message} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FooterToolbar from '../../components/FooterToolbar';


const FormItem = Form.Item;
@Form.create()
class MenuConfigureHome extends Component {
 

  okHandler=(e)=>{
    console.log("enterokhandler");
    e.preventDefault();
    this.props.form.validateFields().then(
      values => {
        console.log("entervalidateValues", values);
        this.props.dispatch({
            type: 'menuConfModel/saveMenuData',
            payload: values,
            callback: () =>　{
              const { success, msg } = this.props.datachange;
              if(success) {
                message.success(msg);
               window.oldRender();
               window.location.reload();
              }
              else message.error(msg);
              this.props.form.resetFields();
            },
          });
      }
    ).catch(errorInfo => {
      console.log(errorInfo);
    });
  }

  render() {
    let { getFieldValue, getFieldDecorator } = this.props.form;
    return (
      <>
        <PageHeaderWrapper content="请填写菜单配置信息">
        <Card>
          <Form onSubmit={this.okHandler}>
          <FormItem label="菜单项父节点">
          {
            getFieldDecorator("fatherNode", { 
              rules: [{ required:true}],
            })(<Select >
                 <Option value="TopMenu">一级菜单</Option>
                </Select>)
          }
          </FormItem>
          <FormItem label="模板模块">
          {
            getFieldDecorator("templateModule", { 
              rules: [{ required:true}],
            })(<Select >
                <Option value="CoopManage">合作方管理</Option>
                <Option value="CheckManage">审核管理</Option>
                </Select>)
          }
          </FormItem>
          {
              getFieldValue("templateModule")=="CoopManage"?
          <FormItem label="数据源">
          {
            getFieldDecorator("dataSource", { 
              rules: [{ required:true}],
            })(<Select >
                <Option value="channel">渠道</Option>
                <Option value="supplier">供应商</Option>
                </Select>)
          }
          </FormItem>
          :
          <FormItem label="数据源">
          {
            getFieldDecorator("dataSource", { 
              rules: [{ required:true}],
            })(<Select >
                <Option value="channelAudit">渠道审核</Option>
                <Option value="supplierAudit">供应商审核</Option>
                </Select>)
          }
          </FormItem>
           }
          <FormItem label="模块路径">
          {
            getFieldDecorator("path", { 
              initialValue:"示例：/configureCenture/Pageconfigure",
              rules: [{ required:true}],
            })(<Input/>)
          }
          </FormItem>
          <FormItem
          label="模块名称"
        >
          {
            getFieldDecorator("moduleName", {
              rules: [{ required:true}],
            })(<Input />)
          }
        </FormItem>
      
           <FooterToolbar>
              <Button type="primary" htmlType="submit">保存</Button >
            </FooterToolbar>
            </Form>
        </Card>
        </PageHeaderWrapper>
      </>
    );
  } 
}

export default connect(({ menuConfModel }) => ({
  datachange:menuConfModel.datachange,
  loading: menuConfModel.loading,
}))(Form.create()(MenuConfigureHome))

