import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageEdit from '../../components/ManageEdit';
import localStorageDB from 'localstoragedb';



@Form.create()
class DepartmentEdit extends PureComponent {

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
          db.insertOrUpdate("EditSetting",{moduleID:2},{setting:editSetting});
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
          db.insertOrUpdate("EditSetting",{moduleID:2},{timestamp:timestamp});
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
                db.insertOrUpdate("EditSetting",{moduleID:2},{setting:editSetting});
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
            index:0,name:"DepartmentInfo",title:"DepartmentInfo",displayMethod:"Form",
            FormSet:[
                {
                    name: "部门名称",
                    field: "name",
                    isRequired: "是",
                    disabled: "",
                    defaultValue: "",
                    component: "Input",
                },
                {
                    name: "上级部门",
                    field: "leadDep",
                    isRequired: "是",
                    disabled: "",
                    defaultValue: "",
                    component: "Input",
                },
                {
                    name: "部门主管",
                    field: "manager",
                    isRequired: "是",
                    disabled: "",
                    defaultValue: "",
                    component: "Input",
                },
                {
                name: "部门人数",
                field: "count",
                isRequired: "是",
                disabled: "",
                defaultValue: "",
                component: "Input",
                },
                {
                    name: "成立时间",
                    field: "buildTime",
                    isRequired: "是",
                    disabled: "",
                    defaultValue: "",
                    component: "Input",
                },
           ]
        },
    ]
        return ( <ManageEdit
                    dispatchType="ManageEditModel/fetchDepartmentEdit"
                    SourceSetting={SourceSetting}
                    initparams={isNew?'':this.props.location.params.EditParam.ID}
                    isNew={isNew}
                    saveEditDispatch='ManageEditModel/saveDepartmentEdit'
                    saveNewDispatch="ManageEditModel/saveNewDepartment"
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
}))(Form.create()(DepartmentEdit))
