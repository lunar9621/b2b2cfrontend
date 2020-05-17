import React,{Component} from 'react';
import {connect} from 'dva';
import { Link, router } from 'umi';
import { routerRedux, Route, Switch } from 'dva/router';
import { Table,Row, Col, Card, Form, Icon, Select, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message,Divider, Tooltip,Radio  } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ManageDetail from '../../components/ManageDetail';
import FooterToolbar from '../../components/FooterToolbar';
const Option = Select.Option;
const FormItem = Form.Item;

@Form.create()
class DetailMakePreview  extends Component {

  constructor(props) {
    super(props);
  }
//目前能用合作方管理
 componentDidMount(){
     const{ SourceSetting,id,dispatchType,initparams}=this.props.location.params;
     console.log("didmountvalues",this.props.location.params);
  }

       save=()=>{
         let {dispatch}=this.props;
         let {SourceSetting,ButtonSetting,id}=this.props.location.params;
         let params={
           SourceSetting,
           ButtonSetting,
           moduleID:id,
         };
         console.log("保存编辑页参数",params);
         dispatch({
          type: 'detailMakeModel/saveDetailSetting',
          payload: params,
          callback: () =>　{
            const { success, msg } = this.props.datachange;
            if(success) {
              message.success(msg);
              router.push({
                pathname: '/ConfigureCenter/PageConfigure/DetailMakeHome',
              });
            }
            else {
              message.error(msg);
            }
          },
        });
       }

  render() {//*************************
    const{ SourceSetting,id,dispatchType,initparams}=this.props.location.params;
    console.log("renderDetailPreview");
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
              <Link to={{ pathname: "DetailMake"}}>
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

export default connect(({ detailMakeModel }) => ({
  datachange: detailMakeModel.datachange, 
}))(Form.create()(DetailMakePreview))