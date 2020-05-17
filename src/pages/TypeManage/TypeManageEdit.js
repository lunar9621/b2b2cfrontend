import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageEdit from '../../components/ManageEdit';
import localStorageDB from 'localstoragedb';



@Form.create()
class TypeManageEdit extends PureComponent {

saveHandler=(values)=>{
    console.log("saveHandlervalues",values);
    console.log("saveHandlerprops",this.props);
    let {isNew}=this.props.location.params;
    let tmpoutDate=values.createDate.toISOString().substring(0, 10);
    values.createDate=tmpoutDate;
    for( let i=0;i<values.TypePropertyInfo.length;i++){
        delete values.TypePropertyInfo[i].key;
        delete values.TypePropertyInfo[i].editable;
    } 
    values.specialProperty=values.TypePropertyInfo;
    delete values.TypePropertyInfo;
    if(isNew){
        this.props.dispatch({
            type: "ManageEditModel/saveNewTypeConfigure",
            payload: values,
            callback: () => {
              const { success, msg } = this.props.datachange;
              if(success) {
                  message.success(msg);
                this.props.history.goBack();
                }
              else message.error(msg);
            },
          })
    }else{
        this.props.dispatch({
            type: "ManageEditModel/saveTypeConfigureEdit",
            payload: values,
            callback: () => {
              const { success, msg } = this.props.datachange;
              if(success){
                   message.success(msg);
                  this.props.history.goBack();
                }
              else message.error(msg);
            },
          })
    }
}
  render() {
      let {isNew}=this.props.location.params;
        let SourceSetting =[{
            index:0,name:"TypeBasicInfo",title:"TypeBasicInfo",displayMethod:"Form",
            FormSet:[
                {
                    name: "类型ID",
                    field: "typeID",
                    isRequired: "是",
                    disabled: true,
                    defaultValue: "用户不可编辑",
                    component: "Input",
                },
                {
            name: "类型名称",
            field: "name",
            isRequired: "是",
            disabled: "",
            defaultValue: "",
            component: "Input",
        },
        {
            name: "类型描述",
            field: "description",
            isRequired: "是",
            disabled: "",
            defaultValue: "",
            component: "Input",
        },
        {
            name: "创建人",
            field: "creator",
            isRequired: "是",
            disabled: "",
            defaultValue: "",
            component: "Input",
        },
        {
            name: "创建时间",
            field: "createDate",
            isRequired: "是",
            disabled: "",
            defaultValue: "",
            component: "DatePicker",
        },
            {
                name: "分类",
                field: "classify",
                isRequired: "是",
                disabled: "",
                defaultValue: "",
                component: "Select",
                options:"supplier-供应商#channel-渠道#contract-合同"
            },
           ]
        },
        {
            index:1,name:"TypePropertyInfo",title:"TypePropertyInfo",displayMethod:"DynamicTable",
            DynamicSet:[
                {
            name: "属性名称",
            field: "name",
            component: "Input",
        },
        {
            name: "属性字段",
            field: "field",
            component: "Input",
        },
        {
            name: "是否必填",
            field: "isRequired",
            component: "Input",
        },
        {
            name: "默认值",
            field: "defaultValue",
            component: "Input",
        },
        {
            name: "创建时间",
            field: "createDate",
            component: "DatePicker",
        },
            {
                name: "组件",
                field: "component",
                component: "选择器",
                options:"Input-输入框#InputNumber-数字输入框#DatePicker-日期选择框#Select-选择器"
            },
           ]
        },
    ]
        return ( <ManageEdit
                    dispatchType="ManageEditModel/fetchTypeConfigureEdit"
                    SourceSetting={SourceSetting}
                    initparams={isNew?'':this.props.location.params.EditParam.typeID}
                    isNew={isNew}
                    saveEditDispatch='ManageEditModel/saveTypeConfigureEdit'
                    saveNewDispatch="ManageEditModel/saveNewTypeConfigure"
                    returnPath="/ConfigureCenter/TypeManage"
                    saveHandler={this.saveHandler}
                > 
                    </ManageEdit>
        )
}
}

export default connect(({ editMakeModel,ManageEditModel }) => ({
  editSetting: editMakeModel.editSetting.obj,
  editTimestamp:editMakeModel.editTimestamp.obj,
  datachange:ManageEditModel.datachange,
  loading: editMakeModel.loading,
}))(Form.create()(TypeManageEdit))
