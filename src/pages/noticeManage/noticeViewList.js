import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {router,Link} from 'umi';
import { Table, Row, Col, Card, Form, Input, Button, Popover, List, Avatar, message, Divider, Popconfirm } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import AnnouncementDetailModal from './AnnouncementDetailModal';

const FormItem = Form.Item;
const { TextArea } = Input;

class noticeViewList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const { dispatch } = this.props;
    const params = {
      page: 1,
      rows: 10,
    };
    dispatch({
      type: 'noticeModel/fetchNotices',
      payload:params,
    })
  }



  


  render() {
    let { noticeLoading, notices } = this.props;
    const { rows: list, pageNumber: current, pageSize, total } = notices;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['3', '10', '20'],
      pageSize,
      current,
      total,
    };
    const columns = [
      {
        title: '序号',
        key: 'rowNumber',
        align: 'center',
        render: (text, record, index) => <span>{index + 1 }</span>,
      },
      {
        title: '公告名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: (text, record, index) => text == null ? text == " " :
        <span>{text.length <= 25 ? text : [text.substring(0, 25), '...'].join("")}</span>,
      },
      {
        title: '创建人',
        dataIndex: 'creatorName',
        key: 'creatorName',
        align: 'center',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        render: val => <span>{val ? moment(val).format('YYYY-MM-DD') : ""}</span>,
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        align: 'center',
        render: val => <span>{val ? moment(val).format('YYYY-MM-DD') : ""}</span>,
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (text, record, index) => {
          if (record.privilege != "view") {
            return (
              <span>
                <AnnouncementDetailModal onOk={this.editHandler} id={record.id}>
                  <a>查看详情</a>
                </AnnouncementDetailModal>
              </span>
            );
          }
        },
      },
    ];


    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div>
              <Table
                dataSource={list}
                loading={noticeLoading}
                columns={columns}
                pagination={paginationProps}
                onChange={this.handleStandardTableChange}
                />
            </div>
        </Card>
        </PageHeaderWrapper>);
  }
}

export default connect(({ noticeModel }) => ({
  notices:noticeModel.noticeList.obj,
  noticeLoading:noticeModel.noticeLoading,
}))(Form.create()(noticeViewList))