import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { routerRedux, Route, Switch } from 'dva/router';
import {router} from 'umi';
import { Table, Row, Col, Card, Form, Input, Select, List,Spin,Descriptions,Button, message} from 'antd';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FooterToolbar from '../../components/FooterToolbar';
import styles from './style.less';


const Option = Select.Option;
const FormItem = Form.Item;

class ManageDetail extends Component {
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
        //渲染特殊属性
      //   if(data&&data.length>0){
      //     let keysArr=Object.keys(data[0]);
      //     if(keysArr.indexOf('specialProperty')!=-1){
      //       if(values.displayMethod=="table"){
      //         for(let item in data[0].specialProperty){
      //           values.tableColumnSet.push({
      //             name: "特殊属性",
      //             field: "specialProperty",
      //             align: "居中"});
      //         }
      //     }
      //   }
      // }
    if(values.displayMethod=="list")
    {
      console.log("enterlistdata",data);
      return loading?<Spin/>:values.itemLayout=="vertical"?<List
          bordered={values.bordered}
          dataSource={values.listItemSet}
          renderItem={item=>(
          <List.Item > <List.Item.Meta
          title={item.name}
          description={data[item.field]}
        /></List.Item>
          )}
          />:<List
          grid={{ gutter: 16, column: values.column }}
          bordered={values.bordered}
          dataSource={values.listItemSet}
          renderItem={item=>(
          <List.Item > <List.Item.Meta
          title={item.name}
          description={data[item.field]}
        /></List.Item>
          )}
          />
    }else if(values.displayMethod=="description"){
      console.log("enterdescription");
      return loading?<span/>:<Descriptions
      bordered={values.bordered}
      layout={values.itemLayout=="vertical"?"vertical":"horizontal"}
      column={values.column}
    >
      {  values.descriptionsItemSet.map(item=><Descriptions.Item label={item.name}>{data[item.field]}</Descriptions.Item>)}
    </Descriptions>
    }else{
      console.log("entertable");
        let columns=[];
       for(let index in values.tableColumnSet){
         let tmpColumn={};
         tmpColumn.title=values.tableColumnSet[index].name;
         tmpColumn.key=values.tableColumnSet[index].field;
         tmpColumn.dataIndex=values.tableColumnSet[index].field;
         tmpColumn.align=values.tableColumnSet[index].align=="左"?"left":values.tableColumnSet[index].align=="中"?"center":"right";
         columns.push(tmpColumn);
       }
       return  <Table
        columns={columns} 
        dataSource={data}
        pagination={false}
        loading={loading}
        bordered
        />
    
    }
  }

  eventHandler=(eventHandlerDispatch, routerParam)=>{
 let {dispatch}=this.props;
 console.log("entereventHandlerdispatch",eventHandlerDispatch);
 message.success("操作成功");
 this.returnHandler();
  }
  returnHandler = () => {
    let {returnPath}=this.props;
      router.push({
        pathname: returnPath,
      })
  }

    render() {
        const{ dataDetail={},SourceSetting=[],ButtonSetting=[],id,dispatchType,initparams,loading}=this.props;
        console.log("renderManageDetail",this.props);
        return (
            <PageHeaderWrapper>
             {loading?<Spin/>: 
               SourceSetting.map(item=>{
              return  <Card bordered={false} title={item.title}>
                  {this.renderDetail(item)}         
                </Card>
               })
             }
              <FooterToolbar> 
                {
                  ButtonSetting.map(item=>{
                    let {existCondition={}}=item;
                    let isexistCondition=Object.keys(existCondition).length>0?true:false;
                    let data=isexistCondition?dataDetail[existCondition.infoName]:{};
                    console.log("existCondition.field",existCondition.field,data);
                  if(isexistCondition&&data&&data[existCondition.field]==existCondition.value) { 
                    if(item.isRouterButton){
                      let routerParam={};
                      routerParam[item.routerFields]=data[item.routerFields];
                     return <Link to={{ pathname: item.routerPath, query: routerParam }} style={{marginRight:12}}>
                        <Button type="primary" >{item.buttonText}</Button >
                    </Link>}else{
                        let routerParam={};
                        routerParam[item.routerFields]=data[item.routerFields];
                    return  <Button type="primary" onClick={()=>this.eventHandler(item.eventHandlerDispatch, routerParam)} style={{marginRight:12}}>{item.buttonText}</Button >
                    }
                  }else{
                    return <span/>
                  }
                  })
                 }
                    <Button type="primary" onClick={this.returnHandler}>返回</Button >
                </FooterToolbar>
            </PageHeaderWrapper>
        );
    }
}
export default connect(({ ManageDetailModel }) => ({
    dataDetail: ManageDetailModel.dataDetail.obj,//详情页数据源
    loading: ManageDetailModel.loading,
}))(Form.create()(ManageDetail))