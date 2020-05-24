import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { routerRedux, Link } from 'dva/router';
import { Col, Row, Card, Form, Input, Button, Radio, message, Select, Upload, Icon, Cascader, Collapse, DatePicker, Divider, Table } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FooterToolbar from '../../components/FooterToolbar';

const FormItem = Form.Item;
const Panel = Collapse.Panel;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

@connect(state => ({
    loading: state.getAnnouncement.loading,
    AffiliateData: state.getAnnouncement.AffiliateData,
    departmentData: state.getAnnouncement.departmentData,
    success: state.getAnnouncement.result.success,
    msg: state.getAnnouncement.result.msg,
}))

@Form.create()
export default class noticeAdd extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'getAnnouncement/getAnnouncementDepartmentData',
        });
        dispatch({
            type: 'getAnnouncement/getAnnouncementAffiliateData',
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (values.rangeType == 1) {
                    values.id = null;
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
                    values.id = null;
                    values.supplierRange = 3;
                    values.range = 0;
                    values.departmentRange = null;
                    values.companyRange = null;
                    delete values.rangeType;
                    delete values.companyChoose;
                    delete values.departmentChoose;
                }
                else if (values.rangeType == 3) {
                    values.id = null;
                    values.storeRange = 3;
                    values.range = 0;
                    values.departmentRange = null;
                    values.companyRange = null;
                    delete values.rangeType;
                    delete values.companyChoose;
                    delete values.departmentChoose;
                }
                else if (values.rangeType == 4) {
                    values.id = null;
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
                    values.id = null;
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
                const { dispatch } = this.props;
                dispatch({
                    type: 'getAnnouncement/addAnnouncement',
                    payload: values,
                    callback: () => {
                        const { success, msg } = this.props;
                        if (success) {
                            message.success(msg);
                            const { dispatch } = this.props;
                            this.props.history.goBack();
                        } else {
                            message.error(msg);
                        }
                    },
                });
            }
        });
    }


    returnHandler = () => {
        this.props.history.goBack();
    }

    render() {
        const { form, loading } = this.props;
        const { getFieldDecorator, validateFieldsAndScroll, getFieldValue } = form;
        const { departmentData: { obj: data1 }, AffiliateData: { obj: data2 } } = this.props;
        const optionfordepartment = data1.map(d => <Option value={d.id}>{d.fullName}</Option>);
        const optionforAffiliate = data2.map(d => <Option value={d.id}>{d.fullName}</Option>);
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        };
        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };

        return (
            <PageHeaderWrapper>
                <Card bordered={false} >
                    <Form layout="horizontal" onSubmit={this.submitHandler}>
                        <Form.Item label="公告题目" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入公告题目' }],
                            })(
                                <TextArea rows={1} placeholder="请输入公告题目" />
                                )}
                        </Form.Item>

                        <Form.Item label="公告内容" {...formItemLayout}>
                            {getFieldDecorator('content', {
                                rules: [{ required: true, message: '请输入公告内容' }],
                            })(
                                <TextArea rows={4}  />
                                )}
                        </Form.Item>
                        {/* style={{ width: 520, height: 155 }} */}

                        <FormItem label="可见范围" {...formItemLayout}>
                            {getFieldDecorator('rangeType', {
                                rules: [{ required: true, message: '请选择可见范围' }],
                                initialValue: 1,
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
                                        initialValue: 1,
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
                                        initialValue: 1,
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
                                        rules: [{ required: true, message: '请选择可见分公司' }],
                                    })(
                                        <Select mode="multiple" tokenSeparators={[',']} placeholder="请选择可见分公司" filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
                                            {optionforAffiliate}
                                        </Select>
                                        )}
                                </FormItem>
                                : <div />
                        }

                        <FormItem {...submitFormLayout}>
                            <Button onClick={this.submitHandler} type="primary" htmlType="submit" loading={loading}>保存</Button >
                            <Button onClick={this.returnHandler} style={{ marginLeft: 12 }}>返回</Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        );
    }
}
