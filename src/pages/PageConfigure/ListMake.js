import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Card, Col, message, Input, Select, Checkbox, Spin } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link, router } from 'umi';
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
      dispatch, dataSource
    } = this.props;
    e.preventDefault();
    this.props.form.validateFields().then(
      values => {
        console.log("entervalidateValues", values);
        for (let i in values.RenderFormSet) {
          delete values.RenderFormSet[i].key;
          delete values.RenderFormSet[i].editable;
        }
        for (let i in values.ColumnSet) {
          delete values.ColumnSet[i].key;
          delete values.ColumnSet[i].editable;
        }
        let initOption = {};
        let initOptionName = dataSource.fieldValue[values.initOptionName].name;
        initOption[initOptionName] = values.initOptionValue;
        delete values.initOptionName;
        delete values.initOptionValue;
        let id = this.props.location.query.id, dispatchType;
        switch (id) {
          case 0:
            dispatchType = "ManageListModel/fetchUserList";
            break;
          case 1:
            dispatchType = "ManageListModel/fetchRoleList";
            break;
          case 2:
            dispatchType = "ManageListModel/fetchDepartList";
            break;
          case 3:
            dispatchType = "ManageListModel/fetchCoopList";
            break;
          case 4:
            dispatchType = "ManageListModel/fetchContractList";
            break;
          case 5:
            dispatchType = "ManageListModel/fetchAuditList";
            break;
        }
        router.push({
          pathname: '/ConfigureCenter/PageConfigure/ListMakePreview',
          params: {
            ...values,
            renderFormLength: values.RenderFormSet.length,
            tableColumnLength: values.ColumnSet.length,
            initOption,
            dispatchType,
            id,
            OtherOpeDispatch: values.OtherOpeName == "none"||dataSource.otherOpe.length==0 ? "" : dataSource.otherOpe.filter(item=>{item.name=values.OtherOpeName}).dispatchType,
            OtherRoutePath: values.OtherRouteName == "none" ||dataSource.otherRoute.length==0? "" : dataSource.otherRoute.filter(item=>{item.name=values.OtherRouteName}).path,
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
    let { getFieldValue, getFieldDecorator } = this.props.form;
    const checkboxOptions = [
      { label: '查看操作', value: 'isView' },
      { label: '编辑操作', value: 'isEdit' },
      { label: '取消操作', value: 'isDelete' },
      { label: '恢复操作', value: 'isRecover' },
    ];
    console.log("listmakeprops", this.props);
    //其他操作与其他路由
    let initOtherOpeName = 'none', initOtherRouteName = 'none', otherOpeOptions,otherRouteOptions;//其他操作和其他路由
    if (dataSource.otherOpe) {
      initOtherOpeName = dataSource.otherOpe.filter(item => item.name = listSetting.otherOpeName)
    }
   
    if (dataSource.otherOpe && dataSource.otherOpe.length > 0) {
      otherOpeOptions = loading ? [<Option value="none">null</Option>] : dataSource.otherOpe.map((item, index) => <Option value={item.index}>{item.name}</Option>);
      otherOpeOptions.unshift(<Option value="none">不包含</Option>);
    }

    if (dataSource.otherRoute) {
      initOtherRouteName = dataSource.otherRoute.filter(item => item.name = listSetting.otherRouteName)
    }

    if (dataSource.otherRoute && dataSource.otherRoute.length > 0) {
      otherRouteOptions = loading ? [<Option value="none">null</Option>] : dataSource.otherOpe.map((item, index) => <Option value={item.index}>{item.name}</Option>);
      otherRouteOptions.unshift(<Option value="none">不包含</Option>);
    }
    //列表页其他操作的选项
    let checkboxdefaultValue=[];
    if(listSetting.isView){
      checkboxdefaultValue.push('isView');
    }
    if(listSetting.isDelete){
      checkboxdefaultValue.push('isDelete');
    }
    if(listSetting.isEdit){
      checkboxdefaultValue.push('isEdit');
    }
    if(listSetting.isRecover){
      checkboxdefaultValue.push('isRecover');
    }
    console.log("checkboxdefaultValue",checkboxdefaultValue);
    //页面初始状态
    let pistatusOptions, pistatusNameOptions,pisinitname='',pisinitvalue='';//初始状态
    pistatusNameOptions = loading ? [<Option value="null">null</Option>] : dataSource.fieldValue.map((item, index) => <Option value={index}>{item.name}</Option>);
    let tmpinitOpt = getFieldValue('initOptionName') ? getFieldValue('initOptionName') : 0;
    if (!loading && tmpinitOpt && dataSource.fieldValue[tmpinitOpt].type == "enum") {
      pistatusOptions = loading ? [<Option value="null">null</Option>] : dataSource.fieldValue[tmpinitOpt].options.map((item) => <Option value={item}>{item}</Option>)
    }
    for(let item in listSetting.initOption){
      pisinitname=item;
      pisinitvalue=listSetting.initOption[item];
    }
    console.log("tmpinitOpt", tmpinitOpt);


    //设置搜索框和列表设置的上次编辑值
    let renderFormArr = listSetting.searchForm && listSetting.searchForm.map(item => {
      return {
        name: item.label,
        field: item.value,
        width: item.wrapperWidth,
        type: item.type == "input" ? "输入框" : item.type == "select" ? "选择器" : item.type == "dataPicker" ? "日期选择框" : "单选组合框"
      }
    })
    if (listSetting.columns && listSetting.columns[0].title == "") {
      listSetting.columns.shift();
    }
    let columnSetArr = listSetting.columns && listSetting.columns.map(item => {
      if (item.title != '') {
        return {
          name: item.title,
          field: item.key,
          align: item.align == "center" ? "居中" : item.align == "right" ? "右" : "左",
        }
      }
    });
    return (
      <>
        <PageHeaderWrapper >
          {loading ?
            <Spin />
            :
            <Form onSubmit={this.okHandler}>
              <Card title="搜索框设置" bordered={false}>
                {getFieldDecorator('RenderFormSet', {
                  initialValue: renderFormArr,
                }
                )(<RenderFormSetTable fieldValue={dataSource.fieldValue} />)}
              </Card>
              <Card title="列表项设置" bordered={false}>
                {getFieldDecorator('ColumnSet', {
                  initialValue: columnSetArr,
                }
                )(<ColumnSetTable fieldValue={dataSource.fieldValue} />)}
              </Card>
              <Card title="其他设置" bordered={false}>
                <FormItem
                  label="页面初始状态名称"
                >
                  {
                    getFieldDecorator('initOptionName', {
                      rules: [{ required: true, message: '请选择跳转路径' }],
                      initialValue:pisinitname,
                    })(<Select
                    >
                      {pistatusNameOptions}
                    </Select>)
                  }
                </FormItem>
                {
                  !loading && dataSource.fieldValue.length > 0 && dataSource.fieldValue[tmpinitOpt].type == "enum" ?
                    <FormItem
                      label="初始状态"
                    >
                      {
                        getFieldDecorator('initOptionValue', {
                          rules: [{ required: true, message: '请选择初始状态' }],
                          initialValue:pisinitvalue,
                        })(<Select
                        >
                          {pistatusOptions}
                        </Select>)
                      }
                    </FormItem>
                    :
                    <FormItem
                      label="初始状态"
                    >
                      {
                        getFieldDecorator('initOptionValue', {
                          rules: [{ required: true, message: '请输入初始状态' }],
                          initialValue:pisinitvalue,
                        })(<Input />)
                      }
                    </FormItem>
                }
                <FormItem
                  label="列表页包含操作"
                >
                  {
                    getFieldDecorator('ColumnOpe', {
                      rules: [{ required: true, message: '请勾选' }],
                      initialValue:checkboxdefaultValue,
                    })(<Checkbox.Group
                      options={checkboxOptions}
                    />)
                  }
                </FormItem>
                {
                  dataSource.otherOpe && dataSource.otherOpe.length > 0 ?
                    <div>
                      <FormItem
                        label="包含其他操作"
                      >
                        {
                          getFieldDecorator('OtherOpeName', {
                            rules: [{ message: '请选择' }],
                            initialValue: initOtherOpeName,
                          })(<Select
                          >
                            {otherOpeOptions}
                          </Select>)
                        }
                      </FormItem>
                      {
                        getFieldValue("OtherOpeName") != "none" ?
                          <FormItem
                            label="包含其他操作名称"
                          >
                            {
                              getFieldDecorator('OtherOpeLabel', {
                                rules: [{ message: '请选择' }],
                                initialValue: listSetting.otherOpeLabel,
                              })(<Input />)
                            }
                          </FormItem>
                          :
                          <div />
                      }
                    </div>
                    : <div />
                }
                 {
                  dataSource.otherRoute && dataSource.otherRoute.length > 0 ?
                    <div>
                      <FormItem
                        label="包含其他路由"
                      >
                        {
                          getFieldDecorator('OtherRouteName', {
                            rules: [{  message: '请选择' }],
                            initialValue: initOtherRouteName,
                          })(<Select
                          >
                            {otherRouteOptions}
                          </Select>)
                        }
                      </FormItem>
                      {
                        getFieldValue("OtherRouteName") != "none" ?
                          <FormItem
                            label="包含其他路由名称"
                          >
                            {
                              getFieldDecorator('OtherRouteLabel', {
                                rules: [{ message: '请选择' }],
                                initialValue: listSetting.otherRouteLabel,
                              })(<Input />)
                            }
                          </FormItem>
                          :
                          <div />
                      }
                    </div>
                    : <div />
                }
              </Card>

              <FooterToolbar>
                <Button type="primary" htmlType="submit">预览</Button >
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
