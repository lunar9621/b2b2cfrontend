import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Input, Popover, Row, Select, InputNumber,Spin } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link ,router} from 'umi';
import { connect } from 'dva';
import ListTable from './DetailMakeTable/ListTable';
import DescriptionsTable from './DetailMakeTable/DescriptionsTable';
import DetailColumnsSetTable from './DetailMakeTable/DetailColumnsSetTable';
import FooterToolbar from '../../components/FooterToolbar';

const { Option } = Select;
const FormItem = Form.Item;


class DetailMake extends Component {
  state = {
    sourceOption: []
  }
  componentDidMount() {
    const { dispatch } = this.props;

    const   id=this.props.location.query.id;
    
    dispatch({
      type: 'detailMakeModel/fetchDetailMakeSource',
      payload: id,
      callback: () => {
        let { dataSource } = this.props;
        let sourceOption = [];
        sourceOption = dataSource.detailData.map((item, index) => <Option value={index}>{item.name}</Option>)
        this.setState({
          sourceOption,
        })
      }
    });
    dispatch({
      type: 'detailMakeModel/fetchDetailSetting',
      payload: id,
    })
  }

  renderSettingDetail = (index) => {
    let { getFieldValue, getFieldDecorator } = this.props.form;
    const {
      dataSource: { detailData=[], specialEvent=[] }, detailSetting: { ButtonSetting=[], SourceSetting=[] }
    } = this.props;
    let isInitSettingExist=SourceSetting&& SourceSetting.length>0?true:false;
    let detailDataDisplay = isInitSettingExist?SourceSetting[index].displayMethod: getFieldValue(`detailDataDisplay${index}`);
    let ListSetArr=isInitSettingExist&&detailDataDisplay== "list"? SourceSetting[index].listItemSet.map((item,index) => {
      return {
        key:index,
        field: item.field,
        name: item.name,
      }
    }):[];
    let DescriptionsSetArr=isInitSettingExist&&detailDataDisplay== "description"? SourceSetting[index].descriptionsItemSet.map((item,index) => {
      return {
        key:index,
        field: item.field,
        name: item.name,
      }
    }):[];
    let tableColumnSetArr=isInitSettingExist&&detailDataDisplay== "table"? SourceSetting[index].tableColumnSet.map((item,index) => {
      return {
        key:index,
        align: item.align,
        field: item.field,
        name: item.name,
      }
    }):[];
    if (detailDataDisplay== "list") {
      return <div>
         <FormItem
        >
          {
            getFieldDecorator(`name${index}`, {
              initialValue: isInitSettingExist? SourceSetting[index].name:detailData[index].name,
            })(<Input type="hidden"/>)
          }
        </FormItem>
        <FormItem
          label="标题"
        >
          {
            getFieldDecorator(`title${index}`, {
              rules: [{ required: true, message: '请选择' }],
              initialValue:isInitSettingExist? SourceSetting[index].title:detailData[index].name,
            })(<Input />)
          }
        </FormItem>
        <FormItem
          label="是否有边框"
        >
          {
            getFieldDecorator(`bordered${index}`, {
              rules: [{ required: true, message: '请选择' }],
              initialValue:isInitSettingExist?SourceSetting[index].bordered:true,
            })(<Select
            >
              <Option value={true}>是</Option>
              <Option value={false}>否</Option>
            </Select>)
          }
        </FormItem>
        <FormItem
          label="选择布局"
        >
          {
            getFieldDecorator(`itemLayout${index}`, {
              rules: [{ required: true, message: '请选择' }],
              initialValue:isInitSettingExist?SourceSetting[index].itemLayout:"vertical",
            })(<Select
            >
              <Option value="vertical">竖排</Option>
              <Option value="horizontal">横排</Option>
            </Select>)
          }
        </FormItem>
        {getFieldValue(`itemLayout${index}`)=="horizontal"? <FormItem
          label="每行列数"
        >
          {
            getFieldDecorator(`column${index}`, {
              rules: [{ required: true, message: '请选择' }],
            })(<InputNumber />)
          }
        </FormItem>:<span/>}
        <FormItem
          label="列表项设置"
        >
          {getFieldDecorator(`listItemSet${index}`, {
              initialValue:ListSetArr,
            })
            (<ListTable fieldValue={detailData[index]?detailData[index].field:[]} />)}
        </FormItem>
      </div>
    } else if (detailDataDisplay == "description") {
      return <div>
         <FormItem
        >
          {
            getFieldDecorator(`name${index}`, {
              initialValue: isInitSettingExist? SourceSetting[index].name:detailData[index].name,
            })(<Input type="hidden"/>)
          }
        </FormItem>
        <FormItem
          label="标题"
        >
          {
            getFieldDecorator(`title${index}`, {
              rules: [{ required: true, message: '请选择' }],
              initialValue: isInitSettingExist? SourceSetting[index].title:detailData[index].name,
            })(<Input />)
          }
        </FormItem>
        <FormItem
          label="列数"
        >
          {
            getFieldDecorator(`column${index}`, {
              rules: [{ required: true, message: '请选择' }],
              initialValue: isInitSettingExist? SourceSetting[index].title:detailData[index].name,
            })(<InputNumber />)
          }
        </FormItem>
        <FormItem
          label="是否有边框"
        >
          {
            getFieldDecorator(`bordered${index}`, {
              rules: [{ required: true, message: '请选择' }],
              initialValue:isInitSettingExist?SourceSetting[index].bordered:true,
            })(<Select
            >
              <Option value={true}>是</Option>
              <Option value={false}>否</Option>
            </Select>)
          }
        </FormItem>
        <FormItem
          label="选择布局"
        >
          {
            getFieldDecorator(`itemLayout${index}`, {
              rules: [{ required: true, message: '请选择' }],
              initialValue:isInitSettingExist?SourceSetting[index].itemLayout:"vertical",
            })(<Select
            >
              <Option value="vertical">竖排</Option>
              <Option value="horizontal">横排</Option>
            </Select>)
          }  
        </FormItem>
        <FormItem
          label="描述列表项设置"
        >
          {getFieldDecorator(`descriptionsItemSet${index}`, {
              initialValue:DescriptionsSetArr,
            })
            (<DescriptionsTable fieldValue={detailData[index]?detailData[index].field:[]} />)}
        </FormItem>
      </div>
    } else {
      return <div>
         <FormItem>
          {
            getFieldDecorator(`name${index}`, {
              initialValue: detailData[index]? detailData[index].name:'',
            })(<Input type="hidden"/>)
          }
        </FormItem>
        <FormItem
          label="标题"
        >
          {
            getFieldDecorator(`title${index}`, {
              rules: [{ required: true, message: '请选择' }],
              initialValue: isInitSettingExist? SourceSetting[index].title:detailData[index].name,
            })(<Input />)
          }
        </FormItem>
        <FormItem
          label="表格列设置"
        >
          {getFieldDecorator(`tableColumnSet${index}`, {
              initialValue:tableColumnSetArr,
            })
            (<DetailColumnsSetTable fieldValue={detailData[index]?detailData[index].field:[]} />)}
        </FormItem>
      </div>
    }
  }

  okHandler = (e) => {
    const {
      dataSource: { detailData=[], specialEvent=[] }, detailSetting: { ButtonSetting, SourceSetting },loading,dispatch
    } = this.props;
    e.preventDefault();
    this.props.form.validateFields().then(
      values => {
        console.log("entervalidateValues", values);
        let detailSetting=[];
        for(let index=0;index<detailData.length;index++){
          console.log("index",index);
          let tmpSet={};
          tmpSet.index=index;
          tmpSet.name=values['name'+index];
          tmpSet.title=values['title'+index];
          tmpSet.displayMethod=SourceSetting && SourceSetting.length > 0 ?SourceSetting[index].displayMethod:values['detailDataDisplay'+index].diaplayMethod;
           if(tmpSet.displayMethod=="list"){
             for(let j in values['listItemSet'+index]){
             delete values['listItemSet'+index][j].key;
             delete values['listItemSet'+index][j].editable;
            }           
            tmpSet.listItemSet=JSON.parse(JSON.stringify(values['listItemSet'+index]));
            tmpSet.bordered=values['bordered'+index];
            tmpSet.itemLayout=values['itemLayout'+index];
            tmpSet.column=values['column'+index];
           }else if(tmpSet.displayMethod=="description"){
            for(let j in values['descriptionsItemSet'+index]){
              delete values['descriptionsItemSet'+index][j].key;
              delete values['descriptionsItemSet'+index][j].editable;
             }           
             tmpSet.descriptionsItemSet=JSON.parse(JSON.stringify(values['descriptionsItemSet'+index]));
             tmpSet.bordered=values['bordered'+index];
             tmpSet.itemLayout=values['itemLayout'+index];
             tmpSet.column=values['column'+index];
           }else{
             console.log("entertableColumnSetindex:",index);
            for(let j in values['tableColumnSet'+index]){
              delete values['tableColumnSet'+index][j].key;
              delete values['tableColumnSet'+index][j].editable;
             }           
             tmpSet.tableColumnSet=JSON.parse(JSON.stringify(values['tableColumnSet'+index]));
           }
           detailSetting.push(tmpSet);
        }
        let id = this.props.location.query.id, dispatchType,initparams;
        switch (id) {
          case 2:
            dispatchType = "ManageDetailModel/fetchDepartmentDetail";
            initparams='0001';
            break;
          case 3:
            dispatchType = "ManageDetailModel/fetchCoopDetail";
            initparams={id:0};
            break;
          case 4:
            dispatchType = "ManageDetailModel/fetchContractDetail";
            initparams={id:0}
            break;
          case 5:
            dispatchType = "ManageDetailModel/fetchNoticeDetail";
            initparams={id:0}
            break;
        }
        //未加ButtonSetting
        console.log("detailSetting",detailSetting);
         router.push({
              pathname: '/ConfigureCenter/PageConfigure/DetailMakePreview',
              params: {
              SourceSetting:detailSetting,
              ButtonSetting,
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
      dataSource: { detailData=[], specialEvent=[] }, detailSetting: { ButtonSetting=[], SourceSetting=[] },loading
    } = this.props;
    const { sourceOption } = this.state;
    console.log("detailrenderstate",this.state,"detailrenderprops",this.props);
    let { getFieldValue, getFieldDecorator } = this.props.form;

  let loadSetting = SourceSetting && SourceSetting.length > 0 ? SourceSetting.map((item,index) => {
    return <Card title={detailData[index].name}>
     {this.renderSettingDetail(index)}
   </Card>
 }) : <span />
    let editSetting = detailData && detailData.length > 0 ? detailData.map((item,index) => {
      return <Card title={detailData[index].name}>
       {detailData[index]&&detailData[index].type == "object" ?
          <FormItem
            label="请选择数据源展示方式"
          >
            {
              getFieldDecorator(`detailDataDisplay${index}`)(<Select>
                <Option value="list">list</Option>
                <Option value="description">description</Option>
              </Select>)
            }
          </FormItem>
          :
          <FormItem
            label="请选择数据源展示方式"
          >
            {
              getFieldDecorator(`detailDataDisplay${index}`)(<Select>
                <Option value="table">table</Option>
              </Select>)
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

export default connect(({ detailMakeModel }) => ({
  dataSource: detailMakeModel.dataSource.obj,//列表页数据源
  detailSetting: detailMakeModel.detailSetting.obj,//列表页初始设置
  loading: detailMakeModel.loading,
}))(Form.create()(DetailMake))
