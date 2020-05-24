import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageEdit from '../../components/ManageEdit';
import localStorageDB from 'localstoragedb';
import TextArea from 'antd/lib/input/TextArea';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FooterToolbar from '../../components/FooterToolbar';

const FormItem = Form.Item;
@Form.create()
class CheckAudit extends PureComponent {

  state = {  
    roleList:[],
    editSetting:[],
  };
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   const { isEnabled } = this.state;
  //   const values = {
  //     isEnabled,
  //   };
  //   let db=new localStorageDB("myDB",localStorage);
  //   let result=db.queryAll("EditSetting", {
  //     query: {moduleID: 0}
  //   });
  //   // console.log("userdbEditquery",result);
  //   // if(!result[0].timestamp){
    // dispatch({
    //     type: 'editMakeModel/fetchEditSetting',
    //     payload:0,
    //     callback:()=>{
    //       let {editSetting}=this.props;
    //       db.insertOrUpdate("EditSetting",{moduleID:3},{setting:editSetting});
    //       this.setState({
    //         editSetting,
    //       })     
    //     }
    //   });
    // }
  //   //   dispatch({
  //   //     type: 'editMakeModel/fetchEditTimestamp',
  //   //     payload:0,
  //   //     callback:()=>{
  //   //       let {editTimestamp:{timestamp}}=this.props;
  //   //       db.insertOrUpdate("EditSetting",{moduleID:3},{timestamp:timestamp});
  //   //       let result=db.queryAll("EditSetting", {
  //   //         query: {moduleID: 0}
  //   //       });
  //   //       console.log("userdbEditqueryafter",result);
  //   //       if(timestamp==result[0].timestamp){
  //   //         this.setState({
  //   //           editSetting:result[0].setting,
  //   //         })
  //   //       }else if(result[0].timestamp!=''){
  //   //         dispatch({
  //   //           type: 'editMakeModel/fetchEditSetting',
  //   //           payload:0,
  //   //           callback:()=>{
  //   //             let {editSetting}=this.props;
  //   //             db.insertOrUpdate("EditSetting",{moduleID:3},{setting:editSetting});
  //   //             this.setState({
  //   //               editSetting,
  //   //             })     
  //   //           }
  //   //         });
  //   //       }
  //   //     }
  //   //   });
    
  //   }

  submitHandler = (e) => {
    let {contractCode,dispatch}=this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(err) return;
      let params={
        ...values,
        contractCode:this.props.location.params.EditParam.contractCode,
      }
      dispatch({
        type: 'ManageEditModel/saveAuditResult',
        payload:params,
      });
    });
  }

    render() {
      const { SourceSetting,dataEdit,id,dispatchType,initparams,loading,returnPath,isNew,dataNewProper}=this.props;
      console.log("renderManageEditprops",this.props,"renderManageEditstate",this.state);
      let {getFieldDecorator}=this.props.form;
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
      return (
          <PageHeaderWrapper>
            <Form onSubmit={this.submitHandler}>
            <Card bordered={false}>
                <FormItem
                  label="审核结果"  {...formItemLayout}>
                  {
                    getFieldDecorator('auditResult')
                    (<Select>
                      <Option value="pass">通过</Option>
                      <Option value="reject">驳回</Option>
                      </Select>)
                  }
                </FormItem>
                <FormItem
                  label="审核意见"  {...formItemLayout}>
                  {
                    getFieldDecorator('auditAdvice')
                    (<TextArea />)
                  }
                </FormItem>
                </Card>
          <FooterToolbar> 
                  <Button type="primary" htmlType="submit" >保存</Button >
                  <Button type="primary" onClick={this.returnHandler}>返回</Button >
              </FooterToolbar>
             </Form>
          </PageHeaderWrapper>
      );
  }
}

export default connect(({ ManageEditModel }) => ({
  datachange:ManageEditModel.datachange,
  loading: ManageEditModel.loading,
}))(Form.create()(CheckAudit))
