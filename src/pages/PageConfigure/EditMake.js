import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Input, Popover, Row, Select, InputNumber,Spin } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link ,router} from 'umi';
import { connect } from 'dva';
import DynamicSetTable from './EditMakeTable/DynamicSetTable';
import FormSetTable from './EditMakeTable/FormSetTable';
import FooterToolbar from '../../components/FooterToolbar';

const { Option } = Select;
const FormItem = Form.Item;


class EditMake extends Component {
  state = {
    sourceOption: []
  }
  componentDidMount() {
    const { dispatch } = this.props;

    const   id=this.props.location.query.id;
    
    dispatch({
      type: 'editMakeModel/fetchEditMakeSource',
      payload: id,
      callback: () => {
        let { dataSource } = this.props;
        let sourceOption = [];
        sourceOption = dataSource.editData.map((item, index) => <Option value={index}>{item.name}</Option>)
        this.setState({
          sourceOption,
        })
      }
    });
    dispatch({
      type: 'editMakeModel/fetchEditSetting',
      payload: id,
    })
  }

  renderSettingDetail = (index) => {
    let { getFieldValue, getFieldDecorator } = this.props.form;
    const {
      dataSource: { editData, specialEvent }, editSetting: { ButtonSetting, SourceSetting }
    } = this.props;
    let editDataDisplay = getFieldValue(`editDataDisplay${index}`);
    if (editDataDisplay== "Form") {
      return  <div>
      <FormItem
      label="表单设置"
    >
      {getFieldDecorator(`FormSet${index}`)
        (<FormSetTable fieldValue={editData[index]?editData[index].field:[]} />)}
    </FormItem>
    </div>
    } else {
      return <div>
        <FormItem
          label="动态表格设置"
        >
          {getFieldDecorator(`DynamicSet${index}`)
            (<DynamicSetTable fieldValue={editData[index]?editData[index].field:[]} />)}
        </FormItem>
      </div>
    }
  }

  okHandler = (e) => {
    const {
      dataSource: { editData, specialEvent }, editSetting: { ButtonSetting, SourceSetting },loading,dispatch
    } = this.props;
    e.preventDefault();
    this.props.form.validateFields().then(
      values => {
        console.log("entervalidateValues", values);
        let editSetting=[];
        for(let index=0;index<editData.length;index++){
          let tmpSet={};
          tmpSet.index=index;
          tmpSet.name=values['name'+index];
          tmpSet.title=values['title'+index];
          tmpSet.displayMethod=values['editDataDisplay'+index];
           if(values['editDataDisplay'+index]=="Form"){
             for(let j in values['FormSet'+index]){
             delete values['FormSet'+index][j].key;
             delete values['FormSet'+index][j].editable;
            }           
            tmpSet.FormSet=JSON.parse(JSON.stringify(values['FormSet'+index]));
           }else{
            for(let j in values['DynamicSet'+index]){
              delete values['DynamicSet'+index][j].key;
              delete values['DynamicSet'+index][j].editable;
             }           
             tmpSet.DynamicSet=JSON.parse(JSON.stringify(values['DynamicSet'+index]));
           }
           editSetting.push(tmpSet);
        }
        let id = this.props.location.query.id, dispatchType,initparams;
        switch (id) {
          case 0:
            dispatchType = "ManageEditModel/fetchUserEdit";
            initparams={id:0};
            break;
          case 1:
            dispatchType = "ManageEditModel/fetchRoleEdit";
            initparams={id:0};
            break;
          case 2:
            dispatchType = "ManageEditModel/fetchDepartEdit";
            initparams={id:0};
            break;
          case 3:
            dispatchType = "ManageEditModel/fetchCoopEdit";
            initparams={id:0};
            break;
          case 4:
            dispatchType = "ManageEditModel/fetchContractEdit";
            initparams={id:0}
            break;
          case 5:
            dispatchType = "ManageEditModel/fetchNoticeEdit";
            initparams={id:0}
            break;
        }
        //未加ButtonSetting
        console.log("editSetting",editSetting);
         router.push({
              pathname: '/ConfigureCenter/PageConfigure/EditMakePreview',
              params: {
              SourceSetting:editSetting,
              id,
              dispatchType,
              initparams,
              }
            });
      }
    ).catch(errorInfo => {
      console.log(errorInfo);
    });
  };

  render() {
    const {
      dataSource: { editData, specialEvent }, editSetting: { ButtonSetting, SourceSetting },loading
    } = this.props;
    const { sourceOption } = this.state;
    console.log("detailrenderstate",this.state,"detailrenderprops",this.props);
    let { getFieldValue, getFieldDecorator } = this.props.form;

    let loadSetting = SourceSetting && SourceSetting.length > 0 ? SourceSetting.map(item => <Card></Card>) : <span />;
    let editSetting = editData && editData.length > 0 ? editData.map((item,index) => {
      return <Card title={editData[index].name}>
         <FormItem
          >
            {
              getFieldDecorator(`name${index}`, {
                initialValue:editData[index].name,
              })(<Input  type="hidden"/>)
            }
          </FormItem>
          <FormItem
          >
            {
              getFieldDecorator(`title${index}`, {
                initialValue:editData[index].name,
              })(<Input />)
            }
          </FormItem>
       {editData[index]&&editData[index].type == "object" ?
          <FormItem
            label="编辑数据源方式"
          >
            {
              getFieldDecorator(`editDataDisplay${index}`, {
                initialValue:"Form",
              })(<Input  disabled={true}/>)
            }
          </FormItem>
          :
          <FormItem
            label="编辑数据源方式"
          >
           {
              getFieldDecorator(`editDataDisplay${index}`, {
                initialValue:"DynamicTable",
              })(<Input  disabled={true}/>)
            }
          </FormItem>
         }
        {this.renderSettingDetail(index)}
      </Card>
    }) : <span />
    return (
      <>
        <PageHeaderWrapper >
          <Form onSubmit={this.okHandler}>
            {loading?
            <Spin/>
            :
            SourceSetting&& SourceSetting.length > 0 ?
              loadSetting
              :
              editSetting
            }
            <FooterToolbar>
              <Button type="primary" htmlType="submit">预览</Button >
            </FooterToolbar>
          </Form>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default connect(({ editMakeModel }) => ({
  dataSource: editMakeModel.dataSource.obj,
  editSetting: editMakeModel.editSetting.obj,
  loading: editMakeModel.loading,
}))(Form.create()(EditMake))
