import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageList from '../../components/ManageList';
import localStorageDB from 'localstoragedb';



@Form.create()
class CheckList extends PureComponent {

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
        title: '合同号',
        dataIndex: 'contractCode',
        width: '12%',
        align: 'center',
        key: 'contractCode',
      } ,{
        title: '生效时间',
        dataIndex: 'startDate',
        width: '12%',
        key: 'startDate',
      },{
        title: '失效时间',
        dataIndex: 'deadDate',
        width: '12%',
        key: 'deadDate',
      },{
        title: '联系方式',
        dataIndex: 'mobile',
        width: '12%',
        key: 'mobile',
      },
      {
        title: '负责人',
        dataIndex: 'name',
        width: '12%',
        key: 'name',
      }
    ];
    let searchForm=[
        {label: "合同号",
    value: "contractCode",
    wrapperWidth: 200,
    type: "input"},
    {
    label: "负责人",
    value: "name",
    wrapperWidth: 200,
    type: "input",
    }
   ];
let isEdit=true,isDelete=false,isView=false,isRecover=false;
   return ( <ManageList
              dispatchType="ManageListModel/fetchCheckList"
              initOption={{}}
              columns={columns}
              stateData="dataList"
              searchForm={searchForm}
              editPath="/CheckManage/Edit"
              viewPath="/CheckManage/Detail"
              deleteDispatch="ManageListModel/checkManageDelete"
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
