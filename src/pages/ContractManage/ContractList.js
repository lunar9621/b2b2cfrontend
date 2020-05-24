import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Menu,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageList from '../../components/ManageList';
import localStorageDB from 'localstoragedb';
import moment from 'moment';



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
    // let result=db.queryAll("ListSetting", {
    //   query: {moduleID: 0}
    // });
    // console.log("userdbListSetquery",result);
    dispatch({
      type: 'listMakeModel/fetchListNewMenu',
      payload:4,
    });
    // if(!result[0].timestamp){
    // dispatch({
    //     type: 'listMakeModel/fetchListSetting',
    //     payload:0,
    //     callback:()=>{
    //       let {listSetting}=this.props;
    //       db.insertOrUpdate("ListSetting",{moduleID:3},{setting:listSetting});
    //       this.setState({
    //         listSetting,
    //       })     
    //     }
    //   });
    // }
    //   dispatch({
    //     type: 'listMakeModel/fetchListTimestamp',
    //     payload:0,
    //     callback:()=>{
    //       let {listTimestamp:{timestamp}}=this.props;
    //       db.insertOrUpdate("ListSetting",{moduleID:3},{timestamp:timestamp});
    //       if(timestamp==result[0].timestamp){
    //         this.setState({
    //           listSetting:result[0].setting,
    //         })
    //       }else if(result[0].timestamp!=''){
    //         dispatch({
    //           type: 'listMakeModel/fetchListSetting',
    //           payload:0,
    //           callback:()=>{
    //             let {listSetting}=this.props;
    //             db.insertOrUpdate("ListSetting",{moduleID:3},{setting:listSetting});
    //             this.setState({
    //               listSetting,
    //             })     
    //           }
    //         });
    //       }
    //     }
    //   });
    
    }

  

 

  render() {
    let  columns = [
      {
        title: '合同号',
        dataIndex: 'contractCode',
        key: 'contractCode',
        align: 'center',
      },
      {
        title: '生效时间',
        dataIndex: 'startDate',
        key: 'startDate',
        align: 'center',
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '失效时间',
        dataIndex: 'deadDate',
        key: 'deadDate',
        align: 'center',
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '审核状态',
        dataIndex: 'auditStatus',
        key: 'auditStatus',
        align: 'center',
        //未提交 审核中 未通过 已通过
      },
      {
        title: '合同状态',
        dataIndex: 'contractStatus',
        key: 'contractStatus',
        align: 'center',
        //未提交 审核中 未通过 未生效 正常 已变更 冻结 退出
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (text, record) => <span>
          <Link to={{ pathname: "info/infoDetail", params: { record: record, quitFileUrl: contractInfo.quitFileUrl } }}>查看</Link>
          {/* <Divider type="vertical" />
          <LineAuditModal><a>编审详情</a></LineAuditModal> */}
        </span>,
      },
    ];
    let searchForm=[
        {label: "合同号",
    value: "contractCode",
    wrapperWidth: 200,
    type: "input"},
    {
    label: "创建日期",
    value: "startDate",
    wrapperWidth: 200,
    type: "datePicker",
    }
   ];
   let {contractresult=[]}=this.props.newMenu;
   console.log("contractresult",contractresult);
   let menu=contractresult.map(item=>{return <Menu.Item key={item.typeID}>{item.name}</Menu.Item>})
       
let isEdit=true,isDelete=true,isView=true,isRecover=false;
   return ( <ManageList
              dispatchType="ManageListModel/fetchContractList"
              initOption={{ }}
              columns={columns}
              stateData="dataList"
              searchForm={searchForm}
              editPath="/ContractManage/Edit"
              viewPath="/ContractManage/Detail"
              deleteDispatch="ManageListModel/contractManageDelete"
              recoverDispatch={''}
              isEdit={isEdit}
              isDelete={isDelete}
              isView={isView}
              isRecover={isRecover}
              newType="Dropdown"
              newMenuOptions={menu}
            > 
            </ManageList>
   )
}
}

export default connect(({ listMakeModel }) => ({
  listSetting: listMakeModel.listSetting.obj,
  listTimestamp:listMakeModel.listTimestamp.obj,
  newMenu:listMakeModel.newMenu.obj,
  loading: listMakeModel.loading,
}))(Form.create()(ContractList))
