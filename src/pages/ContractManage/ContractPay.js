import React from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { router } from 'umi';
import { Col, Row, Card, Form, Input, InputNumber, Button, Radio, message, Select,
  Upload, Icon, Table, Collapse, DatePicker, Divider, Checkbox, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FooterToolbar from '../../components/FooterToolbar';
// import SubAdminsModal from './LineSubAdminsModal';
// from './ContractManage.less';

const FormItem = Form.Item;
const Panel = Collapse.Panel;
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const { RangePicker } = DatePicker; 


class ContractPay extends React.Component {
  
  submitHandler = (e) => {
    let {dispatch} = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err) {
          console.log("submitValues",values);
          let {contractCode}=this.props.location.query;
        values.payDate = values.payDate1.toISOString();
        delete values.payDate1;
        dispatch({
          type: 'ManageEditModel/contractPay',
          payload:{
              ...values,
              contractCode
          },
          callback: () => {
            const { success, msg } = this.props.datachange;
            if(success){
              message.success(msg);
              router.push({
                pathname: '/ContractManage',
              })
            }else{
              message.error(msg);          
            }
          },
        });
      }
    });
  }

  render() {
      console.log("contractPayprops",this.props);
    const { contractCode } = this.props.location.query;
    const { submitLoading, hyBankList } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 3 },
      },
    };

    return (
      <PageHeaderWrapper>
        <Form onSubmit={this.submitHandler} layout="horizontal" >
          <Card bordered={false}>
            <p >付款信息</p>
            <FormItem >
              {
                getFieldDecorator('contractCode', {
                })(<Input  type='hidden' />)
              }
            </FormItem>
            <FormItem 
              label="押金"
              {...formItemLayout}
            >
              {
                getFieldDecorator('payAmount', {
                })(<Input  placeholder="请输入押金" />)
              }
            </FormItem>
            <FormItem 
              label="付款时间"
              {...formItemLayout}
            >
              {
                getFieldDecorator('payDate1', {
                  rules: [{
                    required: true, message: '付款时间为必填项',
                  }],
                })(<DatePicker showTime placeholder="请选择付款日期" format="YYYY-MM-DD HH:mm:ss" />)
              }
            </FormItem>
            <FormItem 
              label="付款方式"
              {...formItemLayout}
            >
              {
                getFieldDecorator('fkfs', {
                  initialValue: 'xxzf',
                  rules: [{
                    required: true, message: '付款方式为必填项',
                  }],
                })(<Select>
                  <Option value='xxzf'>线下支付</Option>
                </Select>)
              }
            </FormItem>
            <FormItem 
              label="银行卡号"
              {...formItemLayout}
            >
              {
                getFieldDecorator('bankAccount', {
                  rules: [{
                    required: true, message: '银行卡号为必填项',
                  }],
                })(<Input placeholder="请输入银行卡号" />)
              }
            </FormItem>
            <FormItem 
              label="开户人"
              {...formItemLayout}
            >
              {
                getFieldDecorator('kaihuren', {
                  rules: [{
                    required: true, message: '开户人为必填项',
                  }],
                })(<Input placeholder="请输入开户人姓名" />)
              }
            </FormItem>
            <FormItem 
              label="账户类型"
              {...formItemLayout}
            >
              {getFieldDecorator('accountType', {
                  rules: [{
                    required: true, message: '账户类型为必填项',
                  }],
                })(
                  <Radio.Group>
                    <Radio value={false}>对公账号</Radio>
                    <Radio value={true}>对私账号</Radio>
                  </Radio.Group>
              )}
            </FormItem>
            <FormItem 
              label="开户行"
              {...formItemLayout}
            >
              {getFieldDecorator('kaihuhang', {
                  rules: [{
                    required: true, message: '开户行为必填项',
                  }],
                })(
                <Input placeholder="请输入开户行名称" />
              )}
            </FormItem>
            <FormItem 
              label="联行号"
              {...formItemLayout}
            >
              {getFieldDecorator('lianhanghao', {
                  rules: [{
                    required: true, message: '联行号为必填项',
                  }],
                })(
                  <Input placeholder="请输入联行号" />
              )}
            </FormItem>
            <p >企业收款信息</p>
              <div>
                <FormItem 
                  label="银行卡号"
                  {...formItemLayout}
                >
                  <span className="ant-form-text">110123123456543</span>
                </FormItem>
                <FormItem 
                  label="开户人"
                  {...formItemLayout}
                >
                  {
                    <span className="ant-form-text">张武</span>
                  }
                </FormItem>
                <FormItem 
                  label="开户行"
                  {...formItemLayout}
                >
                  <span className="ant-form-text">光大银行</span>
                </FormItem>
                <FormItem 
                  label="联行号"
                  {...formItemLayout}
                >
                  <span className="ant-form-text">12356796214</span>
                </FormItem>
                <FormItem 
                  label="账户类型"
                  {...formItemLayout}
                >
                  <span className="ant-form-text">对公</span>
                </FormItem>
              </div> 
            <FormItem {...submitFormLayout} >
              <Button type="primary" htmlType="submit" loading={submitLoading} style={{ marginTop: 12 }}>提交</Button>
              <Button onClick={this.returnHandler} style={{ marginLeft: 8, marginTop: 12 }}>返回</Button>
            </FormItem>
            
          </Card>
        </Form>
      </PageHeaderWrapper>
    );
  }

}

export default connect(({ ManageEditModel }) => ({
    datachange:ManageEditModel.datachange,
    loading: ManageEditModel.loading,
}))(Form.create()(ContractPay))

