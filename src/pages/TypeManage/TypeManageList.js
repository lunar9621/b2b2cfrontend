import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageList from '../../components/ManageList';
import localStorageDB from 'localstoragedb';



@Form.create()
class TypeManageList extends PureComponent {

 

  render() {
    
    let columns = [
      {
        title: '类型名称',
        dataIndex: 'name',
        width: '12%',
        align: 'center',
        key: 'name',
      } ,{
        title: '类型描述',
        dataIndex: 'description',
        width: '12%',
        align: 'center',
        key: 'description',
      },
      {
        title: '创建人',
        dataIndex: 'creator',
        width: '12%',
        align: 'center',
        key: 'creator',
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        width: '12%',
        align: 'center',
        key: 'createDate',
      },
      {
        title: '分类',
        dataIndex: 'classify',
        width: '12%',
        align: 'center',
        key: 'classify',
        render: val =>val=="supplier"?"供应商":val=="channel"?"渠道":"合同",
    },
    ];
    let searchForm=[
        {label: "类型名称",
    value: "name",
    wrapperWidth: 200,
    type: "input"},
    {
    label: "创建日期",
    value: "createTime",
    wrapperWidth: 200,
    type: "datePicker",
    }
   ];
 let isEdit=true,isDelete=true,isView=true,isRecover=true;
   return ( <ManageList
              dispatchType="ManageListModel/fetchTypeConfigureList"
              initOption={{}}
              columns={columns}
              stateData="dataList"
              searchForm={searchForm}
              editPath="./TypeManage/TypeManageEdit"
              viewPath="./TypeManage/TypeManageDetail"
              deleteDispatch="ManageListModel/TypeConfigureDelete"
              recoverDispatch="ManageListModel/TypeConfigureRecover"
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
}))(Form.create()(TypeManageList))
