import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, Select, Table, message, Card, Radio } from 'antd';
import { } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class AnnouncementManageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            RangeType: 0,
            Company: 0,
            Department: 0,
        };
    }

    downshowData = () => {
        const { dispatch, id } = this.props;
        const param = {
            id: id,
        };
        dispatch({
            type: 'getAnnouncement/getAnnouncementDetail',
            payload: param,
            callback: () => {
                if (this.props.AnnouncementDetail.obj.range == 1) this.setState({ RangeType: 1 });
                else if (this.props.AnnouncementDetail.obj.storeRange != 3) this.setState({ RangeType: 2 });
                else if (this.props.AnnouncementDetail.obj.supplierRange != 3) this.setState({ RangeType: 3 });
                else if (this.props.AnnouncementDetail.obj.isAllDepartment == 1) this.setState({ RangeType: 4,Department: 1});
                else if (this.props.AnnouncementDetail.obj.isAllDepartment == 0 && this.props.AnnouncementDetail.obj.departmentRange.length!=0) this.setState({ RangeType: 4,Department: 2});
                else if (this.props.AnnouncementDetail.obj.isAllCompany == 1) this.setState({ RangeType: 5,Company: 1});
                else if (this.props.AnnouncementDetail.obj.isAllCompany == 0 && this.props.AnnouncementDetail.obj.companyRange.length!=0) this.setState({ RangeType: 5,Company: 2});
            },
        });
        dispatch({
            type: 'getAnnouncement/getAnnouncementDepartmentData',
        });
        dispatch({
            type: 'getAnnouncement/getAnnouncementAffiliateData',
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


    okHandler = (e) => {
        e.preventDefault();
        const { onOk, id } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.id = id;
                if (values.rangeType == 1) {
                    values.storeRange = 3;
                    values.supplierRange = 3;
                    values.range = 1;
                    values.departmentRange = null;
                    values.companyRange = null;
                    delete values.rangeType;
                    delete values.companyChoose;
                    delete values.departmentChoose;
                }
                else if (values.rangeType == 2) {
                    values.supplierRange = 3;
                    values.range = 0;
                    values.departmentRange = null;
                    values.companyRange = null;
                    delete values.rangeType;
                    delete values.companyChoose;
                    delete values.departmentChoose;
                }
                else if (values.rangeType == 3) {
                    values.storeRange = 3;
                    values.range = 0;
                    values.departmentRange = null;
                    values.companyRange = null;
                    delete values.rangeType;
                    delete values.companyChoose;
                    delete values.departmentChoose;
                }
                else if (values.rangeType == 4) {
                    values.storeRange = 3;
                    values.supplierRange = 3;
                    values.range = 0;
                    if(values.departmentChoose==1) values.departmentRange ="0";
                    if(values.departmentChoose==2) values.departmentRange = values.departmentRange.toString();
                    values.companyRange = null;
                    delete values.rangeType;
                    delete values.companyChoose;
                    delete values.departmentChoose;
                }
                else if (values.rangeType == 5) {
                    values.storeRange = 3;
                    values.supplierRange = 3;
                    values.range = 0;
                    values.departmentRange = null;
                    if(values.companyChoose==1) values.companyRange ="0";
                    if(values.companyChoose==2) values.companyRange = values.companyRange.toString();
                    delete values.rangeType;
                    delete values.companyChoose;
                    delete values.departmentChoose;
                }
                onOk(values);
                this.hideModelHandler();
            }
        });

    }


    render() {
        console.log("this.props",this.props);
        const { form, children, noticeDetail: { obj: data } } = this.props;
        const { getFieldDecorator, validateFieldsAndScroll, getFieldValue } = form;
        const { departmentData: { obj: data1 }, AffiliateData: { obj: data2 } } = this.props;
        const optionfordepartment = data1.map(d => <Option value={d.id}>{d.fullName}</Option>);
        const optionforAffiliate = data2.map(d => <Option value={d.id}>{d.fullName}</Option>);
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
            <span  >
                <span onClick={this.showModelHandler}>
                    {children}
                </span>
                <Modal
                    title="公告详情"
                    visible={this.state.visible}
                    onOk={this.okHandler}
                    okText="修改"
                    onCancel={this.hideModelHandler}
                >

                    <Form layout="horizontal" onSubmit={this.submitHandler}>
                        <Form.Item label="公告题目" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: data.name || '',
                                rules: [{ required: true, message: '请输入公告题目' }],
                            })(
                                <TextArea rows={1}  placeholder="请输入公告题目" />
                                )}
                        </Form.Item>

                        <Form.Item label="公告内容" {...formItemLayout}>
                            {getFieldDecorator('content', {
                                initialValue: data.content || '',
                                rules: [{ required: true, message: '请输入公告内容' }],
                            })(
                                <TextArea rows={4} />
                                )}
                        </Form.Item>


                        <FormItem label="可见范围" {...formItemLayout}>
                            {getFieldDecorator('rangeType', {
                                rules: [{ required: true, message: '请选择可见范围' }],
                                initialValue: this.state.RangeType || '',
                            })(
                                <RadioGroup>
                                    <Radio value={1}>总公司可见</Radio>
                                    <Radio value={2}>门店可见</Radio>
                                    <Radio value={3}>供应商可见</Radio>
                                    <Radio value={4}>部门可见</Radio>
                                    <Radio value={5}>分公司可见</Radio>
                                </RadioGroup>
                                )}
                        </FormItem>

                        {
                            getFieldValue("rangeType") == 2 ?
                                <FormItem label="门店范围" {...formItemLayout}>
                                    {getFieldDecorator('storeRange', {
                                        initialValue: (data.storeRange == 0 || data.storeRange == 3) ? '0' : data.storeRange,
                                        rules: [{ required: true, message: '请选择可见门店' }],
                                    })(
                                        <Select placeholder="请选择门店范围">
                                            <Option value={'0'}>所有门店</Option>
                                            <Option value={1}>虹宇门店</Option>
                                            <Option value={2}>挂靠门店</Option>
                                            <Option value={4}>直营门店</Option>
                                        </Select>
                                        )}
                                </FormItem>
                                : <div />
                        }

                        {
                            getFieldValue("rangeType") == 3 ?
                                <FormItem label="供应商范围" {...formItemLayout}>
                                    {getFieldDecorator('supplierRange', {
                                        rules: [{ required: true, message: '请选择可见供应商' }],
                                        initialValue: (data.supplierRange == 0 || data.supplierRange == 3) ? '0' : data.supplierRange,
                                    })(
                                        <Select placeholder="请选择供应商范围">
                                            <Option value={'0'}>所有供应商</Option>
                                            <Option value={1}>内部供应商</Option>
                                            <Option value={2}>外部供应商</Option>
                                        </Select>
                                        )}
                                </FormItem>
                                : <div />
                        }



                        {
                            getFieldValue("rangeType") == 4 ?
                                <FormItem label="部门可见范围" {...formItemLayout}>
                                    {getFieldDecorator('departmentChoose', {
                                        rules: [{ required: true, message: '请选择可见范围' }],
                                        initialValue: this.state.Department,
                                    })(
                                        <RadioGroup>
                                            <Radio value={1}>所有部门可见</Radio>
                                            <Radio value={2}>部分部门可见</Radio>
                                        </RadioGroup>
                                        )}
                                </FormItem>
                                : <div />
                        }
                        {
                          ( getFieldValue("rangeType") == 4 && getFieldValue("departmentChoose") == 2 )?
                                <FormItem label="部门范围" {...formItemLayout}>
                                    {getFieldDecorator('departmentRange', {
                                        initialValue: data.departmentRange || '',
                                        rules: [{ required: true, message: '请选择可见部门' }],
                                    })(
                                        <Select mode="multiple" tokenSeparators={[',']} placeholder="请选择可见部门" filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
                                            {optionfordepartment}
                                        </Select>
                                        )}
                                </FormItem>
                                : <div />
                        }

                        {
                            getFieldValue("rangeType") == 5 ?
                                <FormItem label="分公司可见范围" {...formItemLayout}>
                                    {getFieldDecorator('companyChoose', {
                                        rules: [{ required: true, message: '请选择可见范围' }],
                                        initialValue: this.state.Company,
                                    })(
                                        <RadioGroup>
                                            <Radio value={1}>所有分公司可见</Radio>
                                            <Radio value={2}>部分分公司可见</Radio>
                                        </RadioGroup>
                                        )}
                                </FormItem>
                                : <div />
                        }

                        {
                          ( getFieldValue("rangeType") == 5 && getFieldValue("companyChoose") == 2) ?
                                <FormItem label="分公司范围" {...formItemLayout}>
                                    {getFieldDecorator('companyRange', {
                                        initialValue: data.companyRange || '',
                                        rules: [{ required: true, message: '请选择可见分公司' }],
                                    })(
                                        <Select mode="multiple" tokenSeparators={[',']} placeholder="请选择可见分公司" filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
                                            {optionforAffiliate}
                                        </Select>
                                        )}
                                </FormItem>
                                : <div />
                        }

                    </Form>
                </Modal>
            </span>
        );
    }
}

export default connect(({ noticeModel }) => ({
    noticeDetail:noticeModel.noticeDetail,
    noticeLoading:noticeModel.noticeLoading,
  }))(Form.create()(AnnouncementManageModal))
