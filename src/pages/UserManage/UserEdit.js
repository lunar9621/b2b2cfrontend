import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageEdit from '../../components/ManageEdit';
import localStorageDB from 'localstoragedb';



@Form.create()
class UserEdit extends PureComponent {

  state = {  
    roleList:[],
    editSetting:[],
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const { isEnabled } = this.state;
    const values = {
      isEnabled,
    };
    let db=new localStorageDB("myDB",localStorage);
    let result=db.queryAll("EditSetting", {
      query: {moduleID: 0}
    });
    console.log("userdbEditquery",result);
    if(!result[0].timestamp){
    dispatch({
        type: 'editMakeModel/fetchEditSetting',
        payload:0,
        callback:()=>{
          let {editSetting}=this.props;
          db.insertOrUpdate("EditSetting",{moduleID:0},{setting:editSetting});
          this.setState({
            editSetting,
          })     
        }
      });
    }
      dispatch({
        type: 'editMakeModel/fetchEditTimestamp',
        payload:0,
        callback:()=>{
          let {editTimestamp:{timestamp}}=this.props;
          db.insertOrUpdate("EditSetting",{moduleID:0},{timestamp:timestamp});
          let result=db.queryAll("EditSetting", {
            query: {moduleID: 0}
          });
          console.log("userdbEditqueryafter",result);
          if(timestamp==result[0].timestamp){
            this.setState({
              editSetting:result[0].setting,
            })
          }else if(result[0].timestamp!=''){
            dispatch({
              type: 'editMakeModel/fetchEditSetting',
              payload:0,
              callback:()=>{
                let {editSetting}=this.props;
                db.insertOrUpdate("EditSetting",{moduleID:0},{setting:editSetting});
                this.setState({
                  editSetting,
                })     
              }
            });
          }
        }
      });
    
    }


  render() {
      let{editSetting}=this.state;
      let {isNew}=this.props.location.params;
        let SourceSetting =[{
            index:0,name:"UserInfo",title:"UserInfo",displayMethod:"Form",
            FormSet:[
                {
                    name: "用户名",
                    field: "userName",
                    isRequired: "是",
                    disabled: "",
                    defaultValue: "",
                    component: "Input",
                },
                {
                name: "姓名",
                field: "name",
                isRequired: "是",
                disabled: "",
                defaultValue: "",
                component: "Input",
            },
                {
            name: "手机号",
            field: "mobile",
            isRequired: "是",
            disabled: "",
            defaultValue: "",
            component: "Input",
        },
            {
                name: "角色",
                field: "role",
                isRequired: "是",
                disabled: "",
                defaultValue: "管理员",
                component: "Select",
                options:"admin-管理员#user-普通用户"
            },
            {
                name: "所属机构",
                field: "department",
                isRequired: "是",
                disabled: "",
                component:"Input",
                defaultValue: "总公司"
            }]
        }]
        return ( <ManageEdit
                    dispatchType="ManageEditModel/fetchUserEdit"
                    SourceSetting={SourceSetting}
                    initparams={isNew?'':this.props.location.params.EditParam.ID}
                    isNew={isNew}
                    saveEditDispatch='ManageEditModel/saveUserEdit'
                    saveNewDispatch="ManageEditModel/saveNewUser"
                    returnPath="/UserAndRole/UserManage"
                > 
                    </ManageEdit>
        )
}
}

export default connect(({ editMakeModel }) => ({
  editSetting: editMakeModel.editSetting.obj,
  editTimestamp:editMakeModel.editTimestamp.obj,
  loading: editMakeModel.loading,
}))(Form.create()(UserEdit))
