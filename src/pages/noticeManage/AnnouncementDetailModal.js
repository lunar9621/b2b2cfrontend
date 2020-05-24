import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, Select, Table, message, Card, Radio ,Button } from 'antd';
import { } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;


class AnnouncementDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    downshowData = () => {
        const { dispatch, id } = this.props;
        console.log("noticeDetailModalprops",this.props);
        dispatch({
            type: 'noticeModel/fetchNoticeDetail',
            payload: id,
        });
    }

    showModelHandler = (e) => {
        this.downshowData();
        if (e) e.stopPropagation();
        this.setState({
            visible: true,
        });
    };

    hideModelHandler = () => {
        this.setState({
            visible: false,
        });
    };




    render() {
        const { form, children, noticeDetail: { obj: data } } = this.props;
        console.log("DetailModalthis.props",this.props);
        const { getFieldDecorator, validateFieldsAndScroll, getFieldValue } = form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
                md: { span: 19 },
            },
        };
        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };
        return (
            <span >
                <span onClick={this.showModelHandler}>
                    {children}
                </span>
                <Modal
                    title="公告详情"
                    visible={this.state.visible}
                    onCancel={this.hideModelHandler}
                    footer={[ <Button type="primary" onClick={this.hideModelHandler}>返回</Button >]}
                >

                    <Form layout="horizontal" onSubmit={this.submitHandler} >
                        <Form.Item label="公告题目" {...formItemLayout} >
                            {getFieldDecorator('name', {
                                initialValue: data.name || '',
                                rules: [{ required: true, message: '请输入公告题目' }],
                            })(
                                <TextArea rows={3} disabled={true} placeholder="请输入公告题目" />
                                )}
                        </Form.Item>

                        <Form.Item label="公告内容" {...formItemLayout} >
                            {getFieldDecorator('content', {
                                initialValue: data.content || '',
                                rules: [{ required: true, message: '请输入公告内容' }],
                            })(
                                <TextArea rows={6} disabled={true} />
                                )}
                        </Form.Item>

                    </Form>
                </Modal>
            </span>
        );
    }
}

export default connect(({ noticeModel }) => ({
    noticeDetail:noticeModel.noticeDetail,
    noticeLoading:noticeModel.noticeLoading,
  }))(Form.create()(AnnouncementDetailModal))
