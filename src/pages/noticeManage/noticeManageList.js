import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { router, Link } from 'umi';
import { Table, Row, Col, Card, Form, Input, Button, Popover, List, Avatar, message, Divider, Popconfirm } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import AnnouncementManageModal from './AnnouncementManageModal';

const FormItem = Form.Item;
const { TextArea } = Input;
class noticeManageList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
    };
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





  newHandler = () => {
    const { dispatch } = this.props;
    dispatch( router.push({
      pathname: 'noticeManage/announcementAdd',
    })
);
  }

  reloadHandler = (dispatch) => {
    let values={};
    values.page = this.state.current;
    values.rows =  this.state.pageSize;
    dispatch({
      type: 'getAnnouncement/getAnnouncementData',
      payload: values,
      callback: () => {
        this.setState({ current: this.props.AnnouncementData.obj.pageNumber });
        this.setState({ pageSize: this.props.AnnouncementData.obj.pageSize });
     },
    });
  }

  handleStandardTableChange = (pagination) => {
    let params = null;
    const { dispatch } = this.props;
    this.props.form.validateFields((err) => {
      if (err) return;
      let values={};
      values.page = pagination.current;
      values.rows = pagination.pageSize;
      dispatch({
        type: 'getAnnouncement/getAnnouncementData',
        payload: values,
        callback: () => {
          this.setState({ current: this.props.AnnouncementData.obj.pageNumber });
          this.setState({ pageSize: this.props.AnnouncementData.obj.pageSize });
       },
      });
    });
  }

  deleteHandler = (id) => {
    const { dispatch } = this.props;
    const cid = { id };
    var esc = encodeURIComponent;
    var data = Object.keys(cid)
      .map(k => esc(k) + '=' + esc(cid[k]))
      .join('&');
    dispatch({
      type: 'getAnnouncement/deleteAnnouncement',
      payload: data,
      callback: () => {
        const { success, msg } = this.props;
        if (success) {
          message.success(msg);
          this.reloadHandler(dispatch);
        } else {
          message.error(msg);
        }
      },
    });
  }

  editHandler = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'getAnnouncement/editAnnouncement',
      payload: values,
      callback: () => {
        const { success, msg } = this.props;
        if (success) {
          message.success(msg);
          this.reloadHandler(dispatch);
        } else {
          message.error(msg);
        }
      },
    });
  }


  render() {
    const { loading, notices: { success, msg, obj: data } } = this.props;
    const { rows: list, pageNumber: current, pageSize, total } = data;
    
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
        render: (text, record, index) => <span>{index + 1}</span>,
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
                {/* <AnnouncementManageModal onOk={this.editHandler} id={record.id}> */}
                  <a>编辑详情</a>
                {/* </AnnouncementManageModal> */}
                <Divider type="vertical" />
                <Popconfirm title="确定取消该条记录?" onConfirm={this.deleteHandler.bind(null, record.id)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
        },
      },
    ];


    return (
      <PageHeaderWrapper >
        <Card bordered={false}>
          <div >
            <Button type="primary" icon="plus" onClick={this.newHandler}>新建</Button>
          </div>
          <div>
              <Table
                dataSource={list}
                loading={loading}
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
  notices:noticeModel.noticeList,
  noticeLoading:noticeModel.noticeLoading,
}))(Form.create()(noticeManageList))
