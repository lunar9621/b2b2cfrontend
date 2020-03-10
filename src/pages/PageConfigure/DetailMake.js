import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Input, Popover, Row, Select, TimePicker,Spin } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
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

  renderSettingDetail = () => {
    let { getFieldValue, getFieldDecorator } = this.props.form;
    const {
      dataSource: { detailData, specialEvent }, detailSetting: { ButtonSetting, SourceSetting }
    } = this.props;
    let detailDataComp = getFieldValue("detailDataComp");
    let detailDataIndex = getFieldValue("detailDataIndex");
    if (detailDataComp == "list") {
      return <div>
        <FormItem
          label="标题"
        >
          {
            getFieldDecorator('title', {
              rules: [{ required: true, message: '请选择' }],
              initialValue: detailData[detailDataIndex]? detailData[detailDataIndex].field:'',
            })(<Input />)
          }
        </FormItem>
        <FormItem
          label="是否有边框"
        >
          {
            getFieldDecorator('bordered', {
              rules: [{ required: true, message: '请选择' }],
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
            getFieldDecorator('itemLayout', {
              rules: [{ required: true, message: '请选择' }],
            })(<Select
            >
              <Option value="vertical">竖排</Option>
              <Option value="horizon">横排</Option>
            </Select>)
          }
        </FormItem>
        <FormItem
          label="列表项设置"
        >
          {getFieldDecorator('listItemSet')
            (<ListTable fieldValue={detailData[detailDataIndex]?detailData[detailDataIndex].field:[]} />)}
        </FormItem>
      </div>
    } else if (detailDataComp == "decription") {
      return <div>
        <FormItem
          label="标题"
        >
          {
            getFieldDecorator('title', {
              rules: [{ required: true, message: '请选择' }],
              initialValue: detailData[detailDataIndex]? detailData[detailDataIndex].field:'',
            })(<Input />)
          }
        </FormItem>
        <FormItem
          label="列数"
        >
          {
            getFieldDecorator('column', {
              rules: [{ required: true, message: '请选择' }],
            })(<InputNumber />)
          }
        </FormItem>
        <FormItem
          label="是否有边框"
        >
          {
            getFieldDecorator('bordered', {
              rules: [{ required: true, message: '请选择' }],
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
            getFieldDecorator('itemLayout', {
              rules: [{ required: true, message: '请选择' }],
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
          {getFieldDecorator('descriptionsItemSet')
            (<DescriptionsTable fieldValue={detailData[detailDataIndex]?detailData[detailDataIndex].field:[]} />)}
        </FormItem>
      </div>
    } else {
      return <div>
        <FormItem
          label="标题"
        >
          {
            getFieldDecorator('title', {
              rules: [{ required: true, message: '请选择' }],
              initialValue: detailData[detailDataIndex]? detailData[detailDataIndex].field:'',
            })(<Input />)
          }
        </FormItem>
        <FormItem
          label="表格列设置"
        >
          {getFieldDecorator('tableColumnSet')
            (<DetailColumnsSetTable fieldValue={detailData[detailDataIndex]?detailData[detailDataIndex].field:[]} />)}
        </FormItem>
      </div>
    }
  }

  changeSourceOption = (e) => {
    let { getFieldValue, getFieldDecorator } = this.props.form;
    const {
      dataSource: { detailData, specialEvent }, detailSetting: { ButtonSetting, SourceSetting }
    } = this.props;
    let detailDataIndex = getFieldValue("detailDataIndex");
    detailData[detailDataIndex].component == e;
    let sourceOption = [];
    let tmpdata = detailData.filter(item => item.component != "");
    sourceOption = tmpdata.map((item, index) => <Option value={index}>{item.name}</Option>);
    this, this.setState({
      sourceOption,
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
        // for(let i in values.RenderFormSet){
        //   delete values.RenderFormSet[i].key;
        //   delete values.RenderFormSet[i].editable;
        // }
        // for(let i in values.ColumnSet){
        //   delete values.ColumnSet[i].key;
        //   delete values.ColumnSet[i].editable;
        // }
        // let initOption={};
        // let initOptionName=dataSource.fieldValue[values.initOptionName].name;
        // initOption[initOptionName]=values.initOptionValue;
        // delete values.initOptionName;
        // delete values.initOptionValue;
        let id = this.props.location.query.id, dispatchType;
        switch (id) {
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
        //  router.push({
        //       pathname: '/ConfigureCenter/PageConfigure/DetailMakePreview',
        //       params: {
        //        ...values,
        //       //  renderFormLength:values.RenderFormSet.length,
        //       //  tableColumnLength:values.ColumnSet.length,
        //       //  initOption,
        //       //  dispatchType,
        //        id,
        //       }
        //     });
      }
    ).catch(errorInfo => {
      console.log(errorInfo);
    });
  };

  render() {
    const {
      dataSource: { detailData, specialEvent }, detailSetting: { ButtonSetting, SourceSetting },loading
    } = this.props;
    const { sourceOption } = this.state;
    console.log(this.props);
    let { getFieldValue, getFieldDecorator } = this.props.form;

    let loadSetting = SourceSetting && SourceSetting.length > 0 ? SourceSetting.map(item => <Card></Card>) : <span />;
    let editSetting = detailData && detailData.length > 0 ? detailData.map(item => {
      return <Card>
        <FormItem
          label="请选择数据源"
        >
          {
            getFieldDecorator('detailDataIndex', {
              rules: [{ required: true, message: '请选择' }],
            })(<Select
            >
              {sourceOption}
            </Select>)
          }
        </FormItem>
        {detailData[getFieldValue("detailDataIndex")]&&detailData[getFieldValue("detailDataIndex")].type == "object" ?
          <FormItem
            label="请选择数据源展示方式"
          >
            {
              getFieldDecorator('detailDataComp', {
                rules: [{ required: true, message: '请选择' }],
              })(<Select
                onChange={this.changeSourceOption()}
              >
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
              getFieldDecorator('detailDataComp', {
                rules: [{ required: true, message: '请选择' }],
              })(<Select
              >
                <Option value="description">description</Option>
                <Option value="table">table</Option>
              </Select>)
            }
          </FormItem>
        }
        {this.renderSettingDetail()}
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
