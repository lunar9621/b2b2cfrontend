import React,{PureComponent} from 'react';
import {connect} from 'dva';
import {Link } from 'dva/router';
import { routerRedux, Route, Switch } from 'dva/router';
import { Table,Row, Col, Card, Form, Icon, Select, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message,Divider, Tooltip,Radio  } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ManageDetail from '../../components/ManageDetail';
import FooterToolbar from '../../components/FooterToolbar';
const Option = Select.Option;
const FormItem = Form.Item;

@Form.create()
export default  class DetailMakePreview  extends PureComponent {

  constructor(props) {
    super(props);
  }

 componentDidMount(){
     const{ SourceSetting,id,dispatchType,initparams}=this.props.location.params;
     console.log("didmountvalues",this.props.location.params);
  }

       save=()=>{

         let params=JSON.parse(JSON.stringify(this.state));
         console.log("保存详情页参数",params);
       }

  render() {//*************************
    const{ SourceSetting,id,dispatchType,initparams}=this.props.location.params;
    console.log("DetailPreviewState",this.state);
    return (
      <PageHeaderWrapper >
         <Card bordered={false}>
            <ManageDetail
              dispatchType={dispatchType}
              SourceSetting={SourceSetting}
              initparams={initparams}
            > 
            </ManageDetail>
            <FooterToolbar>
              <Button onClick={this.save}>
                保存
              </Button>
              <Link to={{ pathname: "ListMake"}}>
              <Button>
                返回
              </Button>
              </Link>
              </FooterToolbar>
        </Card>
        </PageHeaderWrapper >
    );
  }
}
