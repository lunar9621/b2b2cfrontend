import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Menu,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageList from '../../components/ManageList';
import localStorageDB from 'localstoragedb';
const { SubMenu } = Menu;


class CoopList extends PureComponent {

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
      query: {moduleID: 3}
    });
    console.log("userdbListSetquery",result);
    dispatch({
      type: 'listMakeModel/fetchListNewMenu',
      payload:3,
    });
    if(!result[0].timestamp){
    dispatch({
        type: 'listMakeModel/fetchListSetting',
        payload:3,
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
    console.log("coopmanageprops",this.props);
    let listSetting=this.props.listSetting?this.props.listSetting:{};
    let {columns=[],searchForm=[],isEdit=true,isDelete=true,isView=true,isRecover=true, initOption={},OtherOpeDispatch='',OtherOpeLabel='',
      OtherRouteLabel='',OtherRoutePath=''}=listSetting;
     
    let pathname=this.props.location.pathname;
    let dataSourceValue=pathname.slice(pathname.indexOf("=")+1,pathname.length);
    console.log("dataSource",dataSourceValue);
    if(initOption){
    Object.assign(initOption,{dataSource:dataSourceValue});
    }
    //根据路径判断
    let {channelresult=[],supplierresult=[]}=this.props.newMenu;
    console.log("supplierresult",supplierresult);
    let menu=[];
    if(dataSourceValue=='all'){
      menu.push( 
         <SubMenu title="supplier">
          {supplierresult.map(item=>{return <Menu.Item key={item.typeID}>{item.name}</Menu.Item>})}
         </SubMenu>
      );
      menu.push(
         <SubMenu title="channel" >
         {channelresult.map(item=>{return <Menu.Item key={item.typeID}>{item.name}</Menu.Item>})}
         </SubMenu>
     );
    }else if(dataSourceValue=='supplier'){
      menu.push(
          <SubMenu title="supplier">
      {supplierresult.map(item=>{return <Menu.Item key={item.typeID}>{item.name}</Menu.Item>})}
          </SubMenu>
      );
    }else{
      menu.push(
          <SubMenu title="channel">
      {channelresult.map(item=>{return <Menu.Item key={item.typeID}>{item.name}</Menu.Item>})}
          </SubMenu>
      );
    }
    console.log("menu",menu);
//     let columns = [
//       {
//         title: '合作方名称',
//         dataIndex: 'supplierName',
//         width: '12%',
//         align: 'center',
//         key: 'supplierName',
//       } ,{
//         title: '创建人',
//         dataIndex: 'Operator',
//         width: '12%',
//         key: 'Operator',
//       }
//     ];
//     let searchForm=[
//         {label: "供应商名称",
//     value: "supplierName",
//     wrapperWidth: 200,
//     type: "input"},
//     {
//     label: "创建日期",
//     value: "Date",
//     wrapperWidth: 200,
//     type: "datePicker",
//     }
//    ];
// let isEdit=true,isDelete=true,isView=true,isRecover=false;
   return ( <ManageList
              dispatchType="ManageListModel/fetchCoopList"
              initOption={initOption}
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
              otherOpeDispatch={OtherOpeDispatch}
              otherOpeLabel={OtherOpeLabel}
              otherRouteLabel={OtherRouteLabel}
              otherRoutePath={OtherRoutePath}
              newType="Dropdown"
              newMenuOptions={menu}
            > 
            </ManageList>
   )
}
}

export default connect(({ listMakeModel }) => ({
  listSetting: listMakeModel.listSetting.obj,
  newMenu:listMakeModel.newMenu.obj,
  listTimestamp:listMakeModel.listTimestamp.obj,
  loading: listMakeModel.loading,
}))(Form.create()(CoopList))
