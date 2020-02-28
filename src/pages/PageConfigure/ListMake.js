import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Input, Popover, Row, Select, TimePicker } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import TableForm from './components/TableForm';
import RenderFormSetTable from './ListMakeTable/RenderFormSetTable';
import ColumnSetTable from './ListMakeTable/ColumnSetTable';
import FooterToolbar from './components/FooterToolbar';
import styles from './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;


class ListMake extends Component {
    componentDidMount() {
        const { dispatch } = this.props;

        const params = {
           id:this.props.query.id,
        }
        dispatch({
            type: 'listMakeModel/fetchDataSource',
            payload: params,
        });
    }

  render() {
    const {
     dataSource
    } = this.props;
    return (
      <>
        <PageHeaderWrapper >
          <Form>
          <Card title="搜索框设置" className={styles.card} bordered={false}>
              {getFieldDecorator('RenderFormSet', {
                     initialValue: detailInsurance.insuranceAttachs,
                 }
                 )(<RenderFormSetTable dataSource={dataSource} />)}
          </Card>
          <Card title="列表项设置" className={styles.card} bordered={false}>
          {getFieldDecorator('ColumnSet', {
                     initialValue: detailInsurance.insuranceAttachs,
                 }
                 )(<ColumnSetTable dataSource={dataSource} />)}
          </Card>
          <Card title="成员管理" bordered={false}>
            {getFieldDecorator('members', {
              initialValue: tableData,
            })(<TableForm />)}
          </Card>
           </Form>
        </PageHeaderWrapper>
        <FooterToolbar>
          {this.getErrorInfo()}
          <Button type="primary" onClick={this.validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </>
    );
  }
}

export default connect(({ listMakeModel }) => ({
    dataSource:listMakeModel.dataSource.obj,
  }))(ListMake)
