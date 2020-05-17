import React,{Component} from 'react';
import {connect} from 'dva';
import { Link, router } from 'umi';
import { Table,Row, Col, Card, Form, Icon, Select, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message,Divider, Tooltip,Radio  } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ManageEdit from '../../components/ManageEdit';
import FooterToolbar from '../../components/FooterToolbar';
const Option = Select.Option;
const FormItem = Form.Item;

@Form.create()
 class EditMakePreview  extends Component {

  constructor(props) {
    super(props);
  }

 componentDidMount(){
     const{ SourceSetting,id,dispatchType,initparams}=this.props.location.params;
     console.log("didmountvalues",this.props.location.params);
  }

       save=()=>{
        let {SourceSetting,ButtonSetting,id}=this.props.location.params;
        let {dispatch}=this.props;
         let params={
           SourceSetting,
           ButtonSetting,
           moduleID:id,
         };
         console.log("保存编辑页参数",params);
         dispatch({
          type: 'editMakeModel/saveEditSetting',
          payload: params,
          callback: () =>　{
            const { success, msg } = this.props.datachange;
            if(success) {
              message.success(msg);
              router.push({
                pathname: '/ConfigureCenter/PageConfigure/EditMakeHome',
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
            <ManageEdit
              dispatchType={dispatchType}
              SourceSetting={SourceSetting}
              initparams={initparams}
              isNew={false}
              saveEditDispatch=''
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
export default connect(({ editMakeModel }) => ({
  datachange: editMakeModel.datachange, 
}))(Form.create()(EditMakePreview))




