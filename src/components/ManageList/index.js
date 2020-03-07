import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { routerRedux, Route, Switch } from 'dva/router';
import {router} from 'umi';
import { Table, Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Divider, Tooltip, Radio } from 'antd';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';


const Option = Select.Option;
const FormItem = Form.Item;

class ManageList extends PureComponent {
    componentDidMount() {
        const { dispatch,dispatchType,initOption } = this.props;
        const param ={
            page: 1,
            rows: 10,
        };
        console.log("ManageLkistprops",this.props)
        Object.assign(param,initOption);
        dispatch({
            type: dispatchType,
            payload: param,
        });
    }

    handleTableChange = (pagination) => {
        const { form, dispatch,dispatchType,searchForm } = this.props;
        const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
        validateFieldsAndScroll((error, values) => {
            if (!error) {
                if(values.status == 4) delete values.status;
                for(let i=0;i<searchForm.length;i++){
                   console.log("searchForm[i].value",searchForm[i].value);
                if (typeof (values[searchForm[i].value]) == "undefined" || values[searchForm[i].value] == null || values[searchForm[i].value]=== '') delete values[searchForm[i].value];
                }            
                values.page = pagination.current;
                values.rows = pagination.pageSize;
                var data = Object.keys(values)
                    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
                    .join('&');
                dispatch({
                    type: dispatchType,
                    payload: data,
                });
            }
        });
    }

    handleSearch = (e) => {
        e.preventDefault();
        const { dispatch, form ,dispatchType,searchForm} = this.props;
        form.validateFields((error, values) => {
            if (error) return;
            // if(values.status == 4) delete values.status;
            for(let i=0;i<searchForm.length;i++){
                console.log("searchForm[i].value",searchForm[i].value,values[searchForm[i].value]);
             if (typeof (values[searchForm[i].value]) == "undefined" || values[searchForm[i].value] == null || values[searchForm[i].value]=== '') delete values[searchForm[i].value];
             }      
            values.page = 1;
            values.rows = 10;
            var data = Object.keys(values)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(values[k]))
                .join('&');
            dispatch({
                type: dispatchType,
                payload: data,
            });
        });
    }

    handleFormReset = () => {
        const { form, dispatch,dispatchType,initOption } = this.props;
        form.resetFields();
        const param =initOption;
        var data = Object.keys(param)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(param[k]))
            .join('&');
        dispatch({
            type: dispatchType,
            payload: data,
        });
    }

    renderForm() {
        const { getFieldDecorator } = this.props.form;
        const {searchForm,loading } =this.props;
        console.log("ManageListprops",this.props);
        return (
            loading?<span/>
            :
            <Form layout="inline" onSubmit={this.handleSearch}>
            {
                searchForm.map(item=>{
                    if(item.type=="input"){
                        return <FormItem label={item.label}>
                        {getFieldDecorator(item.value)(
                        <Input  style={{ width: item.wrapperWidth }}/>
                        )}
                   </FormItem>
                    }
                    if(item.type=="select"){
                        return  <FormItem label={item.label}>
                        {getFieldDecorator(item.value)(
                            <Select  style={{ width: item.wrapperWidth }}>
                               {
                                   item.options.map(item=>
                                        <Option value={item.value}>{item.text}</Option>
                                   )
                               }
                            </Select>
                        )}
                    </FormItem>
                    }
                    if(item.type="datePicker"){
                        return   <FormItem 
                        label={item.label}
                      >
                      {
                        getFieldDecorator(item.value)(
                          <DatePicker format="YYYY-MM-DD" style={{ width: item.wrapperWidth }}/>
                        )
                      }
                    </FormItem>
        
                    }
                })
            }
                <span className={styles.submitButtons}>
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                </span>
            </Form>
        );
    }


    createHandler = () => {
        const { dispatch,editPath } = this.props;
        if(editPath!=''){
            router.push({
                pathname: editPath,
              });
          }
        }
    

    render() {
        console.log(this.props.storeInfo);
        const rowKey = record => record.id;//控制台不再报warning
        const {columns,isEdit,isDelete,isView,isRecover, editPath,viewPath,deleteDispatch,recoverDispatch,stateData,sidemenuAuth,match, dataList,loading}= this.props;//需要拿到所有的state
        console.log("after");
        const nowstate=eval(stateData);
        let viewOpe=<span/>,editOpe=<span/>,deleteOpe=<span/>,recoverOpe=<span/>;
        if(isView){
            if(viewPath==''){
                viewOpe=<span style={{marginRight:20}}>查看</span>
            }else{
                viewOpe=<Link to={{ pathname: viewPath, params: { id: record.id, isEdit: true } }} style={{marginRight:20}}>查看</Link>
            }
        }
        if(isEdit){
            if(editPath==''){
                editOpe=<span style={{marginRight:20}}>编辑</span>
            }else{
                editOpe=<Link to={{ pathname: editPath, params: { id: record.id, isEdit: true } }} style={{marginRight:20}}>编辑</Link>
            }
        }
        if(isDelete){
            if(deleteDispatch==''){
                deleteOpe=<span style={{marginRight:20}}>删除</span>
            }else{
                deleteOpe=<Popconfirm title="确定删除?" onConfirm={this.deleteHandler(deleteDispatch)}>
                <a style={{marginRight:20}}>删除</a>
              </Popconfirm>
            }
        }
        if(isRecover){
            if(recoverDispatch==''){
                recoverOpe=<span style={{marginRight:20}}>恢复</span>
            }else{
                recoverOpe=<Popconfirm title="确定恢复?" onConfirm={this.recoverHandler(recoverDispatch)}>
                <a style={{marginRight:20}}>恢复</a>
              </Popconfirm>
            }
        }
        //const currentUrl = match?match.url:"";
        //const arr = sidemenuAuth.filter(v => currentUrl === v.fullUrl);
        //console.log("match",match,sidemenuAuth,arr,nowstate);
        const pageSize =nowstate.obj.pageSize;
        const current = nowstate.obj.pageNumber;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['5', '10', '15', '20'],
            pageSize,
            current,
            total: nowstate.obj.total,
        };
        if(columns[0].key=='row') {
            columns[0]={
             title: '',
             key: 'row',
             align:'center',
             render: (text, record, index) => <span>{index + 1 + ((current - 1) * pageSize)}</span>,
         };
     }else{
         columns.unshift({
          title: '',
         key: 'row',
         align:'center',
         render: (text, record, index) => <span>{index + 1 + ((current - 1) * pageSize)}</span>,});
     }
          if(columns[columns.length-1].title!='操作'){
        columns.push(
        {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (record) =>  
             <span>
                {viewOpe}
                {editOpe}
                {deleteOpe}
                {recoverOpe}
             </span>
        
      })
    }
    console.log("columnOpe", viewOpe,editOpe,deleteOpe,recoverOpe);
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <div className={styles.toolBar}>
                    {/* {
                            sidemenuAuth.length > 0 && arr.length > 0 && arr[0].co !== 'view' ? */}
                                <Button style={{ marginBottom: 10 ,marginRight: 20}} type="primary" icon="plus" onClick={this.createHandler}>新建</Button>
                                {/* : <span />
                        } */}
                        <div className={styles.searchForm}>
                            {this.renderForm()}
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={nowstate.obj.rows}
                        rowKey={rowKey}
                        pagination={paginationProps}
                        loading={loading}
                        onChange={this.handleTableChange}
                        bordered
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }
}
export default connect(({ ManageListModel }) => ({
    dataList: ManageListModel.dataList,//列表页数据源
    loading: ManageListModel.loading,
  }))(Form.create()(ManageList))