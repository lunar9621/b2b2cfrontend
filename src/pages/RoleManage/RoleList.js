import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageList from '../../components/ManageList';
import localStorageDB from 'localstoragedb';



@Form.create()
class RoleList extends PureComponent {

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
          db.insertOrUpdate("ListSetting",{moduleID:1},{setting:listSetting});
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
          db.insertOrUpdate("ListSetting",{moduleID:1},{timestamp:timestamp});
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
                db.insertOrUpdate("ListSetting",{moduleID:1},{setting:listSetting});
                this.setState({
                  listSetting,
                })     
              }
            });
          }
        }
      });
    
    }

  // tableChangeHandler = (pagination) => {
  //   let params = null;
  //   const { dispatch } = this.props;
  //   this.props.form.validateFields((err, values) => {
  //     if (err) return;
  //     const {isEnabled} = this.state;
  //     values.isEnabled=isEnabled;
  //     if (typeof (values.name) == "undefined" || values.name == null) values.name='';
  //     values.name = values.name.replace(/\s+/g,'');
  //     if(values.name == '') delete values.name;
  //     if (typeof (values.username) == "undefined" || values.username == null) values.username='';
  //     values.username = values.username.replace(/\s+/g,'');
  //     if(values.username == '') delete values.username;
  //     if (typeof (values.roleId) == "undefined" || values.roleId == null) delete values.roleId;
  //     values.page = pagination.current;
  //     values.rows = pagination.pageSize;
  //     const params = Object.keys(values)
  //     .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
  //     .join('&');
  //     dispatch({
  //       type: 'generalsetting/fetchRoleList',
  //       payload: params,
  //     });
  //   });
  // }

  // handleSearch = (e) => {
  //   e.preventDefault();
  //   const { dispatch, form } = this.props;
  //   form.validateFields((err, values) => {
  //     if (err) return;
  //     const {isEnabled} = this.state;
  //     values.isEnabled=isEnabled;
  //     if (typeof (values.name) == "undefined" || values.name == null) values.name='';
  //     values.name = values.name.replace(/\s+/g,'');
  //     if(values.name == '') delete values.name;
  //     if (typeof (values.username) == "undefined" || values.username == null) values.username='';
  //     values.username = values.username.replace(/\s+/g,'');
  //     if(values.username == '') delete values.username;
  //     if (typeof (values.roleId) == "undefined" || values.roleId == null) delete values.roleId;
  //     const params = Object.keys(values)
  //     .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
  //     .join('&');
  //     dispatch({
  //       type: 'generalsetting/fetchRoleList',
  //       payload: params,
  //     });
  //   });
  // }
  // isEnabledChange = (e) => {
  //   this.setState({ isEnabled: e.target.value }, () => {
  //     this.props.form.resetFields();
  //     const { dispatch } = this.props;
  //     const {isEnabled} = this.state;
  //     // const pageable = {};
  //     // const authRole = {
  //     //   isEnabled,
  //     // };
  //     // const params = {
  //     //   pageable,
  //     //   authRole,
  //     // };
  //     const values = {
  //       isEnabled,
  //       // page: pageNumber,
  //       // rows: pageSize,
  //     };
  //     const params = Object.keys(values)
  //       .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
  //       .join('&');
  //     dispatch({
  //       type: 'generalsetting/fetchRoleList',
  //       payload: params,
  //     });
  //   });
  // }
  // handleFormReset = () => {
  //   const { form, dispatch } = this.props;
  //   form.resetFields();
  //   const param = {
  //     isEnabled:this.state.isEnabled,
  //   };
  //   var data = Object.keys(param)
  //     .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(param[k]))
  //     .join('&');
  //   dispatch({
  //     type: 'generalsetting/fetchRoleList',
  //     payload: data,

  //   });
  // }

  // reloadHandler = (dispatch) => {
  //   const { current, pageSize } = this.props;
  //   this.props.form.validateFields((err, values) => {
  //   if (err) return;
  //   if (typeof (values.name) == "undefined" || values.name == null) values.name='';
  //   values.name = values.name.replace(/\s+/g,'');
  //   if(values.name == '') delete values.name;
  //   if (typeof (values.username) == "undefined" || values.username == null) values.username='';
  //   values.username = values.username.replace(/\s+/g,'');
  //   if(values.username == '') delete values.username;
  //   if (typeof (values.roleId) == "undefined" || values.roleId == null) delete values.roleId;
  //   values.page=current;
  //   values.rows = pageSize;
  //   const params = Object.keys(values)
  //   .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
  //   .join('&');
  //   dispatch({
  //     type: 'generalsetting/fetchRoleList',
  //     payload: params,
  //   });
  // });
  // }

  // cancelHandler = (username) => {
  //   const { dispatch } = this.props;
  //   const cid = {username};
  //   const params = Object.keys(cid)
  //   .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(cid[k]))
  //   .join('&');
  //   dispatch({
  //     type: 'generalsetting/cancelrole',
  //     payload: params,
  //     callback: () => {
  //       const { success, msg } = this.props;
  //       if(success){
  //         message.success(msg);
  //         this.reloadHandler(dispatch);
  //       }else{
  //         message.error(msg);          
  //       }
  //     },
  //   });    
  // }

  // restoreHandler = (username) => {
  //   const { dispatch } = this.props;
  //   const rid = {username};
  //   const params = Object.keys(rid)
  //   .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(rid[k]))
  //   .join('&');
  //   dispatch({
  //     type: 'generalsetting/restorerole',
  //     payload: params,
  //     callback: () => {
  //       const { success, msg } = this.props;
  //       if(success){
  //         message.success(msg);
  //         this.reloadHandler(dispatch);
  //       }else{
  //         message.error(msg);          
  //       }
  //     },
  //   });
  // }

  // resetpassword = (username) => {
  //   const { dispatch } = this.props;
  //   const rid = {username};
  //   const params = Object.keys(rid)
  //   .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(rid[k]))
  //   .join('&');
  //   dispatch({
  //     type: 'generalsetting/resetpassword',
  //     payload: params,
  //     callback: () => {
  //       const { success, msg } = this.props;
  //       if(success){
  //         message.success(msg);
  //         this.reloadHandler(dispatch);
  //       }else{
  //         message.error(msg);          
  //       }
  //     },
  //   });
  // }
  // editHandler = (values) => {
  //   const { dispatch } = this.props;
  //   delete values.departmentId;
  //   const params = Object.keys(values)
  //   .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
  //   .join('&');
  //   dispatch({
  //     type: 'generalsetting/editrole',
  //     payload: params,
  //     callback: () => {
  //       const { success, msg } = this.props;
  //       if(success){
  //         message.success(msg);
  //         this.reloadHandler(dispatch);
  //       }else{
  //         message.error(msg);          
  //       }
  //     },
  //   });
  // }


  // createHandler = (values) => {
  //   const { dispatch } = this.props;
  //   values.departmentId=parseInt(values.departmentId[values.departmentId.length - 1], 10);
  //   const params = Object.keys(values)
  //   .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
  //   .join('&');
  //   dispatch({
  //     type: 'generalsetting/addrole',
  //     payload: params,
  //     callback: () => {
  //       const { success, msg } = this.props;
  //       if(success){
  //         message.success(msg);
  //         this.reloadHandler(dispatch);
  //       }else{
  //         message.error(msg);          
  //       }
  //     },
  //   });
  // }

  render() {
    let searchForm=[{
      label: "角色名称",
      value: "name",
      wrapperWidth: 200,
      type: "input"
  }];
    let columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        width: '12%',
        align: 'center',
        key: 'name',
      },{
        title: '描述',
        dataIndex: 'description',
        align: 'center',
        width: '16%',
        key: 'description',
        //render: val => <span>{val?val.fullName:""}</span>,
      },
    ];
let isEdit=true,isDelete=true,isView=false,isRecover=false;
let initOption={};
   return ( <ManageList
              dispatchType="ManageListModel/fetchRoleList"
              initOption={initOption}
              columns={columns}
              match={this.props.match}
              stateData="dataList"
              searchForm={searchForm}
              editPath="/UserAndRole/RoleManageEdit"
              viewPath={''}
              deleteDispatch="ManageListModel/roleManageDelete"
              recoverDispatch={''}
              isEdit={isEdit}
              isDelete={isDelete}
              isView={isView}
              isRecover={isRecover}
              OtherRouteLabel="授权限"
              OtherRoutePath="/UserAndRole/RoleManageGrantAuth"
            > 
            </ManageList>
   )
}
}

export default connect(({ listMakeModel }) => ({
  listSetting: listMakeModel.listSetting.obj,
  listTimestamp:listMakeModel.listTimestamp.obj,
  loading: listMakeModel.loading,
}))(Form.create()(RoleList))
