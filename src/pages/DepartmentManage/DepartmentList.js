import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageList from '../../components/ManageList';
import localStorageDB from 'localstoragedb';



@Form.create()
class DepartmentList extends PureComponent {

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
          db.insertOrUpdate("ListSetting",{moduleID:2},{setting:listSetting});
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
          db.insertOrUpdate("ListSetting",{moduleID:2},{timestamp:timestamp});
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
                db.insertOrUpdate("ListSetting",{moduleID:2},{setting:listSetting});
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
    let searchForm= [{
      label: "部门名称",
      value: "name",
      wrapperWidth: 200,
      type: "input"
  }, {
      label: "部门主管",
      value: "manager",
      wrapperWidth: 200,
      type: "input"
  }];
    let columns = [
      {
        title: '部门名称',
        dataIndex: 'name',
        width: '12%',
        align: 'center',
        key: 'name',
      } ,{
        title: '上级部门',
        dataIndex: 'leadDep',
        width: '12%',
        key: 'leadDep',
      }, {
        title: '部门主管',
        dataIndex: 'manager',
        width: '14%',
        align: 'center',
        key: 'manager',
      },  {
        title: '部门人数',
        dataIndex: 'count',
        align: 'center',
        width: '12%',
        key: 'count',
        //render: val => <span>{val?val.name:""}</span>,
      }, {
        title: '成立时间',
        dataIndex: 'buildTime',
        align: 'center',
        width: '16%',
        key: 'buildTime',
        //render: val => <span>{val?val.fullName:""}</span>,
      },
    ];
let isEdit=true,isDelete=true,isView=false,isRecover=false;
let initOption={};
   return ( <ManageList
              dispatchType="ManageListModel/fetchDepartmentList"
              initOption={initOption}
              columns={columns}
              match={this.props.match}
              stateData="dataList"
              searchForm={searchForm}
              editPath="/DepartmentManage/Edit"
              viewPath="/DepartmentManage/Detail"
              deleteDispatch="ManageListModel/departmentManageDelete"
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
}))(Form.create()(DepartmentList))
