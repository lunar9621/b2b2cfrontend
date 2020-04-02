import React,{Component} from 'react';
import {connect} from 'dva';
import {Link } from 'dva/router';
import { Table,Row, Col, Card, Form, Icon, Select, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message,Divider, Tooltip,Radio  } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ManageEdit from '../../components/ManageEdit';
import FooterToolbar from '../../components/FooterToolbar';
const Option = Select.Option;
const FormItem = Form.Item;

@Form.create()
export default  class EditMakePreview  extends Component {

  constructor(props) {
    super(props);
  }

 componentDidMount(){
     const{ SourceSetting,id,dispatchType,initparams}=this.props.location.params;
     console.log("didmountvalues",this.props.location.params);
  }

       save=()=>{

         let params=JSON.parse(JSON.stringify(this.props.location.params));
         console.log("保存编辑页参数",params);
       }

  render() {//*************************
    const{ SourceSetting,id,dispatchType,initparams}=this.props.location.params;
    console.log("renderDetailPreview");
    return (
      <PageHeaderWrapper >
         <Card bordered={false}>
            <ManageEdit
              dispatchType={dispatchType}
              SourceSetting={SourceSetting}
              initparams={initparams}
              isNew={false}
              saveDispatch=''
            > 
            </ManageEdit>
            <FooterToolbar>
              <Button onClick={this.save}>
                保存
              </Button>
              <Link to={{ pathname: "EditMake"}}>
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
