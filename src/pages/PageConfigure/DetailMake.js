import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Input, Popover, Row, Select, TimePicker } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import RenderFormSetTable from './ListMakeTable/RenderFormSetTable';
import ColumnSetTable from './ListMakeTable/ColumnSetTable';
import FooterToolbar from '../../components/FooterToolbar';

const { Option } = Select;
const { RangePicker } = DatePicker;


class DetailMake extends Component {
    componentDidMount() {
        const { dispatch } = this.props;

        const params = {
           id:this.props.query.id,
        }
        dispatch({
            type: 'detailMakeModel/fetchDataSource',
            payload: params,
        });
        dispatch({
          type:'detailMakeModel/fetchListSetting',
          payload:params,
        })
    }

  render() {
    const {
     dataSource,listSetting
    } = this.props;
    return (
      <>
        <PageHeaderWrapper >
          <Form>
          <Card title="搜索框设置" className={styles.card} bordered={false}>
              {getFieldDecorator('RenderFormSet', {
                     initialValue: listSetting.renderFormSetting,
                 }
                 )(<RenderFormSetTable fieldValue={dataSource.fieldValue} />)}
          </Card>
          {/* <Card title="列表项设置" className={styles.card} bordered={false}>
          {getFieldDecorator('ColumnSet', {
                     initialValue: listSetting.renderFormSetting,
                 }
                 )(<ColumnSetTable fieldValue={dataSource.fieldValue} />)}
          </Card> */}
          <Card title="其他设置" bordered={false}>

          </Card>
           </Form>
        </PageHeaderWrapper>
        <FooterToolbar>
        <Link to={{ pathname: "ListMakePreview", query: { id: this.props.id} }}>
            <Button type="primary" >预览</Button >
        </Link>
        </FooterToolbar>
      </>
    );
  }
}

export default connect(({ listMakeModel }) => ({
    dataSource:listMakeModel.dataSource.obj,//列表页数据源
    listSetting:listMakeModel.listSetting.obj,//列表页初始设置
  }))(DetailMake)
