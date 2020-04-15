import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageList from '../../components/ManageList';
import localStorageDB from 'localstoragedb';



@Form.create()
class ContractList extends PureComponent {

  state = {  
    roleList:[],
    isEnabled: true,
    listSetting:[],
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const { isEnabled } = this.state;
    const values = {
      isEnabled,
    };
    let db=new localStorageDB("myDB",localStorage);
    let result=db.queryAll("ListSetting", {
      query: {moduleID: 0}
    });
    console.log("userdbListSetquery",result);
    if(!result[0].timestamp){
    dispatch({
        type: 'listMakeModel/fetchListSetting',
        payload:0,
        callback:()=>{
          let {listSetting}=this.props;
          db.insertOrUpdate("ListSetting",{moduleID:3},{setting:listSetting});
          this.setState({
            listSetting,
          })     
        }
      });
    }
      dispatch({
        type: 'listMakeModel/fetchListTimestamp',
        payload:0,
        callback:()=>{
          let {listTimestamp:{timestamp}}=this.props;
          db.insertOrUpdate("ListSetting",{moduleID:3},{timestamp:timestamp});
          if(timestamp==result[0].timestamp){
            this.setState({
              listSetting:result[0].setting,
            })
          }else if(result[0].timestamp!=''){
            dispatch({
              type: 'listMakeModel/fetchListSetting',
              payload:0,
              callback:()=>{
                let {listSetting}=this.props;
                db.insertOrUpdate("ListSetting",{moduleID:3},{setting:listSetting});
                this.setState({
                  listSetting,
                })     
              }
            });
          }
        }
      });
    
    }

  

 

  render() {
    let columns = [
      {
        title: '供应商名称',
        dataIndex: 'supplierName',
        width: '12%',
        align: 'center',
        key: 'supplierName',
      } ,{
        title: '创建人',
        dataIndex: 'Operator',
        width: '12%',
        key: 'Operator',
      }
    ];
    let searchForm=[
        {label: "供应商名称",
    value: "supplierName",
    wrapperWidth: 200,
    type: "input"},
    {
    label: "创建日期",
    value: "Date",
    wrapperWidth: 200,
    type: "datePicker",
    }
   ];
let isEdit=true,isDelete=true,isView=true,isRecover=false;
   return ( <ManageList
              dispatchType="ManageListModel/fetchCoopList"
              initOption={{
                  status:"0"
              }}
              columns={columns}
              stateData="dataList"
              searchForm={searchForm}
              editPath="/CoopManage/Edit"
              viewPath="/CoopManage/Detail"
              deleteDispatch="ManageListModel/coopManageDelete"
              recoverDispatch={''}
              isEdit={isEdit}
              isDelete={isDelete}
              isView={isView}
              isRecover={isRecover}
            > 
            </ManageList>
   )
}
}

export default connect(({ listMakeModel }) => ({
  listSetting: listMakeModel.listSetting.obj,
  listTimestamp:listMakeModel.listTimestamp.obj,
  loading: listMakeModel.loading,
}))(Form.create()(CheckList))
