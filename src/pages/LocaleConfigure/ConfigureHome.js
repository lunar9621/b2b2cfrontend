import { Button,Card,Form,Select,Input} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Link } from 'umi';
import zhcn from '../../locales/zh-CN.js';
import zhtw from '../../locales/zh-TW.js';
import enus from '../../locales/en-US.js';
import ptbr from '../../locales/pt-BR.js';
import myLocal from '../../locales/myLocal.js';
import LocaleConfTable from './LocaleConfTable';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FooterToolbar from '../../components/FooterToolbar';


const FormItem = Form.Item;
@Form.create()
class ConfigureHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initValue: [],
      myLocalName:'',
    };
  }
  componentDidMount(){
    const {dispatch}=this.props;
    let initValue=[];
    let myLocalName='';
    dispatch({
      type: 'localeConfModel/fetchMyLocalConfigure',
      callback: () => {
        let { dataMyLocal } = this.props;
        for(let key in dataMyLocal){
          if(key!=''){
          myLocalName=key;
        }
      }
      for(let id in zhcn){
        let tmpLang={};
        tmpLang.ID=id;
        tmpLang.zhCN=zhcn[id];
        tmpLang.zhTW=zhtw[id]?zhtw[id]:'';
        tmpLang.enUS=enus[id]?enus[id]:'';
        tmpLang.ptBR=ptbr[id]?ptbr[id]:'';
        tmpLang.myLocal=myLocal[id]?myLocal[id]:'';
       initValue.push(tmpLang);
       }
       console.log("initValue",initValue);
       this.setState({
         initValue,
         myLocalName,
       })
      }
    })
  }

  okHandler=(e)=>{
    e.preventDefault();
    this.props.form.validateFields().then(
      values => {
        console.log("entervalidateValues", values);
      }
    ).catch(errorInfo => {
      console.log(errorInfo);
    });
  }

  render() {
    let { getFieldValue, getFieldDecorator } = this.props.form;
    console.log("localeConfigureRender",getFieldValue("isHaveLocalName"));
    return (
      <>
        <PageHeaderWrapper content="请编辑某种语言进行配置">
        <Card>
          <Form onSubmit={this.okHandler}>
          {this.state.myLocalName===''?
          <div>
          <FormItem label="是否有自定义语言">
          {
            getFieldDecorator("isHaveLocalName")(<Select>
              <Option value="true">是</Option>
              <Option value="false">否</Option>
            </Select>)
          }
          </FormItem>
          {getFieldValue("isHaveLocalName")=="true"?<FormItem
          label="自定义语言名"
        >
          {
            getFieldDecorator(`myLocalName`, {
              rules: [{ required: true, message: '请编辑' }],
              initialValue: this.state.myLocalName,
            })(<Input />)
          }
        </FormItem>:
        <span/>
        }
          </div>
          :
          <div>
          <FormItem >
          {
            getFieldDecorator("isHaveLocalName", {
              initialValue:"true",
            })(<Input  type="hidden"/>)
          }
          </FormItem>
          <FormItem
          label="自定义语言名"
        >
          {
            getFieldDecorator(`myLocalName`, {
              rules: [{  message: '请编辑' }],
              initialValue: this.state.myLocalName,
            })(<Input />)
          }
        </FormItem>
        </div>
          }
        <FormItem
        label="词汇配置"
        >
          {getFieldDecorator(`LocaleConfigure`,{ initialValue: this.state.initValue,})
            (<LocaleConfTable myLocalName={getFieldValue("isHaveLocalName")=="true"?getFieldValue("myLocalName"):""}/>)}
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

export default connect(({ localeConfModel }) => ({
  dataMyLocal: localeConfModel.dataMyLocal.obj,//列表页数据源
  loading: localeConfModel.loading,
}))(Form.create()(ConfigureHome))

