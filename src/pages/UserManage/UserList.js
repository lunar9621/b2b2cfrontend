import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageList from '../../components/ManageList';
import localStorageDB from 'localstoragedb';



@Form.create()
class UserList extends PureComponent {

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
          db.insertOrUpdate("ListSetting",{moduleID:0},{setting:listSetting});
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
          db.insertOrUpdate("ListSetting",{moduleID:0},{timestamp:timestamp});
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
                db.insertOrUpdate("ListSetting",{moduleID:0},{setting:listSetting});
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
        title: '用户名',
        dataIndex: 'username',
        width: '12%',
        align: 'center',
        key: 'username',
      } ,{
        title: '姓名',
        dataIndex: 'name',
        width: '12%',
        key: 'name',
      }, {
        title: '手机号',
        dataIndex: 'mobile',
        width: '14%',
        align: 'center',
        key: 'mobile',
      },  {
        title: '角色',
        dataIndex: 'role',
        align: 'center',
        width: '12%',
        key: 'role',
        //render: val => <span>{val?val.name:""}</span>,
      }, {
        title: '所属机构',
        dataIndex: 'department',
        align: 'center',
        width: '16%',
        key: 'department',
        //render: val => <span>{val?val.fullName:""}</span>,
      },
    ];
let isEdit=true,isDelete=true,isView=false,isRecover=false;
let searchForm=[],initOption={};
   return ( <ManageList
              dispatchType="ManageListModel/fetchUserList"
              initOption={initOption}
              columns={columns}
              match={this.props.match}
              stateData="dataList"
              searchForm={searchForm}
              editPath="/UserAndRole/UserManageEdit"
              viewPath={''}
              deleteDispatch="ManageListModel/userManageDelete"
              recoverDispatch={''}
              isEdit={isEdit}
              isDelete={isDelete}
              isView={isView}
              isRecover={isRecover}
              OtherOpeLabel="重置密码"
              OtherOpeDispatch="ManageListModel/userManageResetPWD"
            > 
            </ManageList>
   )
}
}

export default connect(({ listMakeModel }) => ({
  listSetting: listMakeModel.listSetting.obj,
  listTimestamp:listMakeModel.listTimestamp.obj,
  loading: listMakeModel.loading,
}))(Form.create()(UserList))
