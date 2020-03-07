import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Card, Col, message, Input, Select, Checkbox, Spin } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link ,router} from 'umi';
import { connect } from 'dva';
import RenderFormSetTable from './ListMakeTable/RenderFormSetTable';
import ColumnSetTable from './ListMakeTable/ColumnSetTable';
import FooterToolbar from '../../components/FooterToolbar';
import config from '../../../config/config';
const { Option } = Select;
const FormItem = Form.Item;

class ListMake extends Component {
  componentDidMount() {
    console.log("props", this.props);
    const { dispatch } = this.props;

    const id = this.props.location.query.id;
    dispatch({
      type: 'listMakeModel/fetchListMakeSource',
      payload: id,
    });
    dispatch({
      type: 'listMakeModel/fetchListSetting',
      payload: id,
    })
  }

  okHandler = (e) => {
    const {
      dispatch,dataSource
    } = this.props;
    e.preventDefault();
    this.props.form.validateFields().then(
    values=>{ 
      console.log("entervalidateValues",values);
      for(let i in values.RenderFormSet){
        delete values.RenderFormSet[i].key;
        delete values.RenderFormSet[i].editable;
      }
      for(let i in values.ColumnSet){
        delete values.ColumnSet[i].key;
        delete values.ColumnSet[i].editable;
      }
      let initOption={};
      let initOptionName=dataSource.fieldValue[values.initOptionName].name;
      initOption[initOptionName]=values.initOptionValue;
      delete values.initOptionName;
      delete values.initOptionValue;
      let id=this.props.location.query.id,dispatchType;
      switch(id){
        case 0:
          dispatchType="ManageListModel/fetchUserList";
           break;
        case 1:
          dispatchType="ManageListModel/fetchRoleList";
           break;
        case 2:
          dispatchType="ManageListModel/fetchDepartList";
          break;
        case 3:
          dispatchType="ManageListModel/fetchCoopList";
          break;
        case 4:
          dispatchType="ManageListModel/fetchContractList";
          break;
        case 5:
          dispatchType="ManageListModel/fetchAuditList";
          break;
      } 
     router.push({
          pathname: '/ConfigureCenter/PageConfigure/ListMakePreview',
          params: {
           ...values,
           renderFormLength:values.RenderFormSet.length,
           tableColumnLength:values.ColumnSet.length,
           initOption,
           dispatchType,
           id,
          }
        });
    }
     ).catch(errorInfo => {
     console.log(errorInfo);
    });
  };

  render() {
    const {
      dataSource, listSetting, loading
    } = this.props;
    let {getFieldValue,getFieldDecorator}=this.props.form;
    const  checkboxOptions  = [
      { label: '查看操作', value: 'isView' },
      { label: '编辑操作', value: 'isEdit' },
      { label: '取消操作', value: 'isDelete' },
      { label: '恢复操作', value: 'isRecover' },
    ];
    console.log("dataSource", this.props);
    let otherOpeOptions,initNameOptions,initValueOptions;
    if(dataSource.otherOpe&&dataSource.otherOpe.length>0){
      otherOpeOptions = loading?[<Option value="null">null</Option>]:dataSource.otherOpe.map((item, index) => <Option value={item}>{item}</Option>);
      otherOpeOptions.unshift( <Option value="none">不包含</Option>);
    }
    initNameOptions = loading?[<Option value="null">null</Option>]:dataSource.fieldValue.map((item, index) => <Option value={index}>{item.name}</Option>);
    let tmpinitOpt=getFieldValue('initOptionName')?getFieldValue('initOptionName'):0;
    if(!loading&&tmpinitOpt&&dataSource.fieldValue[tmpinitOpt].type=="enum"){
    initValueOptions=loading?[<Option value="null">null</Option>]:dataSource.fieldValue[tmpinitOpt].options.map((item)=><Option value={item}>{item}</Option>)
    }
    console.log("tmpinitOpt",tmpinitOpt);
    return (
      <>
        <PageHeaderWrapper >
          {loading ?
            <Spin />
            :
            <Form onSubmit = {this.okHandler}>
              <Card title="搜索框设置" bordered={false}>
                {getFieldDecorator('RenderFormSet', {
                  initialValue: listSetting.renderFormSetting,
                }
                )(<RenderFormSetTable fieldValue={dataSource.fieldValue} />)}
              </Card>
              <Card title="列表项设置" bordered={false}>
                {getFieldDecorator('ColumnSet', {
                  initialValue: listSetting.columnSetting,
                }
                )(<ColumnSetTable fieldValue={dataSource.fieldValue} />)}
              </Card>
              <Card title="其他设置" bordered={false}>
                <FormItem
                  label="新建及编辑页面跳转路径"
                >
                  {
                    getFieldDecorator('editPath', {
                      rules: [{ required: true, message: '请选择跳转路径' }],
                    })(<Input style={{ width: '100%' }} />)
                  }
                </FormItem>
                <FormItem
                  label="页面初始状态"
                >
                  {
                    getFieldDecorator('initOptionName', {
                      rules: [{ required: true, message: '请选择跳转路径' }],
                    })(<Select
                      > 
                        {initNameOptions}
                        </Select>)
                  }
                </FormItem>
               {
               !loading&&dataSource.fieldValue.length>0&&dataSource.fieldValue[tmpinitOpt].type=="enum"? 
               <FormItem
                  label="初始状态"
                >
                  {
                    getFieldDecorator('initOptionValue', {
                      rules: [{ required: true, message: '请选择跳转路径' }],
                    })(<Select
                      > 
                        {initValueOptions }
                        </Select>)
                  }
                </FormItem>
                :
                <FormItem
                label="初始状态值"
              >
                {
                  getFieldDecorator('initOptionValue', {
                    rules: [{ required: true, message: '请选择跳转路径' }],
                  })(<Input/>)
                }
              </FormItem>
                 }
                <FormItem
                  label="列表页包含操作"
                >
                  {
                    getFieldDecorator('ColumnOpe', {
                      rules: [{ required: true, message: '请勾选' }],
                    })(<Checkbox.Group
                      options={checkboxOptions}
                    />)
                  }
                </FormItem>
                {dataSource.otherOpe&&dataSource.otherOpe.length>0?
                  <FormItem
                  label="包含其他操作"
                >
                  {
                    getFieldDecorator('OtherOpe', {
                      rules: [{ required: true, message: '请选择' }],
                    })(<Select
                    > 
                      {otherOpeOptions}
                      </Select>)
                  }
                </FormItem>
                :
                <div/>
                }
              </Card>
          
              <FooterToolbar>
            <Button type="primary" htmlType = "submit">预览</Button >
        </FooterToolbar>
        </Form>
  }
        </PageHeaderWrapper>
       
      </>
    );
  }
}

export default connect(({ listMakeModel }) => ({
  dataSource: listMakeModel.dataSource.obj,//列表页数据源
  listSetting: listMakeModel.listSetting.obj,//列表页初始设置
  loading: listMakeModel.loading,
}))(Form.create()(ListMake))
