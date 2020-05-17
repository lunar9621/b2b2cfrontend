import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageDetail from '../../components/ManageDetail';
import localStorageDB from 'localstoragedb';



@Form.create()
class TypeManageDetail extends PureComponent {

  render() {
    let classifySecond=this.props.location.params.ViewParam.classify;
    let columnArr;
    if(classifySecond=="supplier"){
     columnArr=[{name: "供应商名称", field: "coopName", align: "居中"},
     {name: "创建人", field: "creator", align: "居中"},
     {name: "创建日期", field: "createDate", align: "居中"},
     {name: "地址", field: "address", align: "居中"},
     {name: "状态", field: "status", align: "居中"},
     {name: "联系人", field: "contacts", align: "居中"},
     {name: "联系方式", field: "phone", align: "居中"},
    ]
    }else{
      columnArr=[{name: "渠道名称", field: "channelName", align: "居中"},
      {name: "创建人", field: "creator", align: "居中"},
      {name: "创建日期", field: "createDate", align: "居中"},
      {name: "地址", field: "address", align: "居中"},
      {name: "状态", field: "status", align: "居中"},
      {name: "联系人", field: "contacts", align: "居中"},
      {name: "联系方式", field: "phone", align: "居中"},
     ]
    }
    //公用属性信息，默认属性信息都可在配置页配置，
        let SourceSetting =[{
            index: 0,
            name: "TypeBasicInfo",
            title: "TypeBasicInfo",
            displayMethod: "list",
            listItemSet: [
                {name: "类型名称",
            field: "name",
            align: "居中"},
            {name: "类型描述",
            field: "description",
            align: "居中"},
            {name: "创建人",
            field: "creator",
            align: "居中"},
            {name: "创建日期",
            field: "createDate",
            align: "居中"},
            {name: "分类",
            field: "classify",
            align: "居中"},
           ],
            bordered: true,
            itemLayout: "vertical",
            column: undefined,
        },
        {
            index: 1,
            name: "TypePropertyInfo",
            title: "TypePropertyInfo",
            displayMethod: "table",
            tableColumnSet: [
                {name: "属性名称",
            field: "name",
            align: "居中"},
            {name: "属性域名（英文）",
            field: "field",
            align: "居中"},
            {name: "创建人",
            field: "Operator",
            align: "居中"},
            {name: "创建日期",
            field: "Date",
            align: "居中"},
            {name: "类型",
            field: "type",
            align: "居中"},
            {name: "是否必填",
            field: "isRequired",
            align: "居中"},
            {name: "默认值",
            field: "defaultValue",
            align: "居中"},
            {name: "所用组件",
            field: "component",
            align: "居中"},
           ],
            bordered: true,
            itemLayout: "vertical",
            column: undefined,
        },
        {
            index: 2,
            name: "TypeData",
            title: "TypeData",
            displayMethod: "table",
            tableColumnSet:columnArr,
            bordered: true,
            itemLayout: "vertical",
            column: undefined,
        },
    ]
        return ( <ManageDetail
            dispatchType="ManageDetailModel/fetchTypeConfigureDetail"
            SourceSetting={SourceSetting}
            initparams={this.props.location.params.ViewParam.typeID}
            returnPath="/ConfigureCenter/TypeManage"
          > 
          </ManageDetail>
        )
}
}

export default connect(({ detailMakeModel }) => ({
  detailSetting: detailMakeModel.detailSetting.obj,
  detailTimestamp:detailMakeModel.detailTimestamp.obj,
  loading: detailMakeModel.loading,
}))(Form.create()(TypeManageDetail))
