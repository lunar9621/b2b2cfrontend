import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Spin,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageEdit from '../../components/ManageEdit';
import localStorageDB from 'localstoragedb';



@Form.create()
class CoopEdit extends PureComponent {

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
      query: {moduleID: 3}
    });
    console.log("userdbEditquery",result);
    // if(result[0]&&!result[0].timestamp){
    // dispatch({
    //     type: 'editMakeModel/fetchEditSetting',
    //     payload:3,
    //     callback:()=>{
    //       let {editSetting}=this.props;
    //       db.insertOrUpdate("EditSetting",{moduleID:3},{setting:editSetting});
    //       this.setState({
    //         editSetting,
    //       })     
    //     }
    //   });
    // }
    //   dispatch({
    //     type: 'editMakeModel/fetchEditTimestamp',
    //     payload:3,
    //     callback:()=>{
    //       let {editTimestamp:{timestamp}}=this.props;
    //       db.insertOrUpdate("EditSetting",{moduleID:3},{timestamp:timestamp});
    //       let result=db.queryAll("EditSetting", {
    //         query: {moduleID: 3}
    //       });
    //       console.log("userdbEditqueryafter",result);
    //       if(timestamp==result[0].timestamp){
    //         this.setState({
    //           editSetting:result[0].setting,
    //         })
    //       }else if(result[0].timestamp!=''){
    //         dispatch({
    //           type: 'editMakeModel/fetchEditSetting',
    //           payload:3,
    //           callback:()=>{
    //             let {editSetting}=this.props;
    //             db.insertOrUpdate("EditSetting",{moduleID:3},{setting:editSetting});
    //             this.setState({
    //               editSetting,
    //             })     
    //           }
    //         });
    //       }
    //     }
    //   });
    dispatch({
      type: 'editMakeModel/fetchEditSetting',
      payload:3,
      callback:()=>{
        let {editSetting}=this.props;
        db.insertOrUpdate("EditSetting",{moduleID:3},{setting:editSetting});
        this.setState({
          editSetting,
        })     
      }
    });
    }


  render() {
      // let {editSetting}=this.state;
      let {SourceSetting=[]}=this.state.editSetting;
      let {isNew=true,newParam}=this.props.location.params;
      let {loading}=this.props;
      console.log("CoopEditprops",this.props);
        // let SourceSetting =[{
        //     index:0,name:"CoopInfo",title:"CoopInfo",displayMethod:"Form",
        //     FormSet:[
        //         {
        //             name: "供应商名称",
        //             field: "supplierName",
        //             isRequired: "是",
        //             disabled: "",
        //             defaultValue: "",
        //             component: "Input",
        //         },
        //         {
        //             name: "创建人",
        //             field: "Operator",
        //             isRequired: "是",
        //             disabled: "",
        //             defaultValue: "",
        //             component: "Input",
        //         },
        //         {
        //         name: "创建日期",
        //         field: "Date",
        //         isRequired: "是",
        //         disabled: "",
        //         defaultValue: "",
        //         component: "Input",
        //     },]
        // }]
        return ( loading?<Spin/>:<ManageEdit
                    dispatchType="ManageEditModel/fetchCoopEdit"
                    SourceSetting={SourceSetting}
                    initparams={isNew?'':this.props.location.params.EditParam.coopID}
                    isNew={isNew}
                    newParam={newParam}
                    saveEditDispatch='ManageEditModel/saveCoopEdit'
                    saveNewDispatch="ManageEditModel/saveNewCoop"
                    AfterSavePath="/ContractManage/Edit"
                    newDispatchType="ManageEditModel/fetchCoopNewProper"
                    returnPath="/CoopManage/dataSource=all"
                > 
                    </ManageEdit>
        )
}
}

export default connect(({ editMakeModel }) => ({
  editSetting: editMakeModel.editSetting.obj,
  editTimestamp:editMakeModel.editTimestamp.obj,
  loading: editMakeModel.loading,
}))(Form.create()(CoopEdit))
