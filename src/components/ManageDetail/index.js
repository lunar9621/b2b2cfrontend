import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { routerRedux, Route, Switch } from 'dva/router';
import {router} from 'umi';
import { Table, Row, Col, Card, Form, Input, Select, List} from 'antd';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';


const Option = Select.Option;
const FormItem = Form.Item;

class ManageDetail extends PureComponent {
    componentDidMount() {
        const {dispatch}=this.props;
        const{ SourceSetting,id,dispatchType,initparams}=this.props;
        console.log("ManageDetailprops",this.props);
        dispatch({
            type: dispatchType,
            payload: initparams,
        });
    }

    renderDetail=(values)=>{
        let {dataDetail,loading}=this.props;
        console.log("renderDetaildataDetail",dataDetail,"renderDetailvalues",values,"loading",loading);
        let data=dataDetail[values.name];
    if(values.displayMethod=="list"){
    return loading?<span/>:<List
          bordered={values.bordered}
          itemLayout={values.itemLayout=="vertival"?"vertical":"horizontal"}
          >
              {values.listItemSet.map(
                 itemtmp=>{
                 console.log("listItemSetitemtmp",itemtmp);
                 return <List.item title={itemtmp.name}>{data[itemtmp.field]}</List.item>
                 }
              )}
        </List>
    }else if(values.displayMethod=="description"){
    return loading?<span/>:<Descriptions
      bordered={values.bordered}
      layout={values.itemLayout=="vertival"?"vertical":"horizontal"}
      column={values.column}
    >
      {  values.descriptionsItemSet.map(item=><DescriptionItem label={item.name}>{data[item.field]}</DescriptionItem>)}
    </Descriptions>
    }else{
        let columns=[];
       for(let index in values.tableColumnSet){
         let tmpColumn={};
         tmpColumn.title=values.tableColumnSet[index].title;
         tmpColumn.key=values.tableColumnSet[index].field;
         tmpColumn.dataIndex=values.tableColumnSet[index].field;
         tmpColumn.align=tmpColumn.align=="左"?"left":tmpColumn.align=="中"?"center":"right";
         columns.push(tmpColumn);
       }
  return <Table
        columns={columns} 
        dataSource={data}
        pagination={false}
        loading={loading}
        bordered
        />
    }
  }

    render() {
        const{ SourceSetting,id,dispatchType,initparams}=this.props;
        return (
            <PageHeaderWrapper>
               { SourceSetting.map(item=>{
                <Card bordered={false} title={item.title}>
                   {this.renderDetail(item)}
                </Card>
               })
             }
            </PageHeaderWrapper>
        );
    }
}
export default connect(({ ManageDetailModel }) => ({
    dataDetail: ManageDetailModel.dataDetail.obj,//详情页数据源
    loading: ManageDetailModel.loading,
}))(Form.create()(ManageDetail))