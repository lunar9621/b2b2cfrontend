import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Card, Col, message, Input, Select, Checkbox, Spin,Cascader } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link, router } from 'umi';
import { connect } from 'dva';
import FooterToolbar from '../../components/FooterToolbar';
import config from '../../../config/config';

const { Option } = Select;
const FormItem = Form.Item;

class BusinessMake extends Component {
//   componentDidMount() {
//     console.log("props", this.props);
//     const { dispatch } = this.props;

//     const id = this.props.location.query.id;
//     dispatch({
//       type: 'listMakeModel/fetchListMakeSource',
//       payload: id,
//       callback:()=>{
//         console.log("afterprops", this.props);
//       }
//     });
//     dispatch({
//       type: 'listMakeModel/fetchListSetting',
//       payload: id,
//     })
//   }

  okHandler = (e) => {
    const {
      dispatch, dataSource
    } = this.props;
    e.preventDefault();
    this.props.form.validateFields().then(
      values => {
        dispatch({
            type: 'BusinessMakeModel/saveBusinessMake',
            callback: () =>　{
              const { success, msg } = this.props.datachange;
              if(success) {
                message.success(msg);
                router.push({
                  pathname: '/ConfigureCenter/BusinessConfigure',
                });
              }
              else {
                message.error(msg);
              }
            },
          });
      } 
    ).catch(errorInfo => {
      console.log(errorInfo);
    });
  };

  render() {
   
    let moduleID = this.props.location.query.id;
    let { getFieldValue, getFieldDecorator } = this.props.form;
    console.log("businessmakeprops", this.props);
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
    let scopeOptions = [
        {
          value: 'all',
          label: '全部供应商',
        },
        {
          label: '某类供应商',
          children: [
            {
              value: 'TripType',
              label: '旅游线路类供应商',
            },
            {
                value: 'HotelType',
                label: '酒店类供应商',
            },
          ],
        },
      ];
    return (
      <>
        <PageHeaderWrapper >
            <Form onSubmit={this.okHandler}>
              <Card bordered={false}>
                <FormItem
                  label="请选择配置事件"
                   {...formItemLayout}
                 >
                  {
                    getFieldDecorator('ConfigureEvent')(<Select
                    >
                      <Option value="audit">提交审核事件</Option>
                    </Select>)
                  }
                </FormItem>
                <FormItem
                  label="请选择配置范围"
                  {...formItemLayout}
                >
                  {
                    getFieldDecorator('ConfigureEventScope')(
                    <Cascader options={scopeOptions} />
                    )
                  }
                </FormItem>
                <FormItem
                  label="请选择审核角色"
                  {...formItemLayout}
                >
                  {
                    getFieldDecorator('ConfigureEventRole')(<Select>
                          <Option value="admin">管理员</Option>
                          <Option value="user">用户</Option>
                    </Select>
                    )
                  }
                </FormItem>
              </Card>

              <FooterToolbar>
                <Button type="primary" htmlType="submit">提交</Button >
              </FooterToolbar>
            </Form>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default connect(({ BusinessMakeModel }) => ({
  datachange:BusinessMakeModel.datachange,
}))(Form.create()(BusinessMake))
