import React,{PureComponent} from 'react';
import {connect} from 'dva';
import { Link, router } from 'umi';
import { routerRedux, Route, Switch } from 'dva/router';
import { Table,Row, Col, Card, Form, Icon, Select, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message,Divider, Tooltip,Radio  } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ManageList from '../../components/ManageList';
import FooterToolbar from '../../components/FooterToolbar';
const Option = Select.Option;
const FormItem = Form.Item;

 class ListMakePreview  extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      searchForm:[],
      columns:[  {
        title: '',
        dataIndex: '',
        key: '',
    }, ],
    isEdit:false,
    isDelete:false,
    isView:false,
    isRecover:false,
    otherOpeName:'',
    otherOpeDispatch:'',
    otherOpeLabel:'',
    otherRouteName:'',
    otherRoutePath:'',
    otherRouteLabel:'',
    dispatchType:this.props.location.params.dispatchType,
    initOption:{},
    moduleID:'',
    };
  }

 componentDidMount(){
     const{RenderFormSet,ColumnSet,ColumnOpe,renderFormLength,tableColumnLength,editPath,dispatchType}=this.props.location.params;
    console.log("didmountvalues",this.props.location.params);
    let searchForm=[];
    let columns=[];
    let {initOption,id}=this.props.location.params
    for(let i=0;i<renderFormLength;i++){
      let searchFormItem={}
      searchFormItem.label=RenderFormSet[i].name;
      searchFormItem.value=RenderFormSet[i].field;
      searchFormItem.wrapperWidth=RenderFormSet[i].width;
      switch(RenderFormSet[i].type){
        case "输入框":
           searchFormItem.type="input";
           break;
        case "选择器":
           searchFormItem.type="select";
           break;
        case "日期选择框":
          searchFormItem.type="dataPicker";
          break;
        case "单选组合框":
           searchFormItem.type="Radio";
           break;
        default:
           searchFormItem.type="input";
      } 
      if(RenderFormSet[i].type=="选择器"||RenderFormSet[i].type=="单选组合框"){
        let options=[];
        let tempoptions=RenderFormSet[i].split('#');
        for(let i=0;i<tempoptions.length;i++){
          let opt={};
          opt.value=tempoptions[i].split('-')[0];
          opt.text=tempoptions[i].split('-')[1];
          options.push(opt);
        }
        searchFormItem.options=options;
      }
     searchForm.push(searchFormItem);
    }

    for(let i=0;i<tableColumnLength;i++){
      let columnItem={}
      columnItem.title=ColumnSet[i].name;
      columnItem.dataIndex=ColumnSet[i].field;
      columnItem.key=ColumnSet[i].field;
     columnItem.align=ColumnSet[i].align=="左"?"left":ColumnSet[i].align=="中"?"center":"right";
     columns.push(columnItem);
    }
    console.log(searchForm,columns);
    let isDelete=false,isEdit=false,isView=false,isRecover=false;
    if(ColumnOpe.indexOf('isEdit')!=-1){
      isEdit=true;
    }
    if(ColumnOpe.indexOf('isDelete')!=-1){
      isDelete=true;
    }
    if(ColumnOpe.indexOf('isView')!=-1){
      isView=true;
    }
    if(ColumnOpe.indexOf('isRecover')!=-1){
      isRecover=true;
    }
    let otherOpeDispatch="",otherOpeLabel="",otherOpeName="";
    let otherRoutePath="",otherRouteName="",otherRouteLabel=""
    if(this.props.location.params.OtherOpeName){
      otherOpeDispatch=this.props.location.params.OtherOpeDispatch;
      otherOpeLabel=this.props.location.params.OtherOpeLabel;
      otherOpeName=this.props.location.params.OtherOpeName;
    }
    if(this.props.location.params.OtherRouteName){
      otherRoutePath=this.props.location.params.OtherRoutePath;
      otherRouteLabel=this.props.location.params.OtherRouteLabel;
      otherRouteName=this.props.location.params.OtherRouteName;
    }
    this.setState({
      searchForm,
      columns,
      isEdit,
      isDelete,
      isView,
      isRecover,
      otherOpeName,
      otherOpeDispatch,
      otherOpeLabel,
      otherRouteName,
      otherRoutePath,
      otherRouteLabel,
      dispatchType,
      initOption,
      moduleID:id,
    });
       }

       save=()=>{
             console.log("savehandlerprops",this.props);
             
             let {dispatch}=this.props;
             let params=JSON.parse(JSON.stringify(this.state));
             delete params.dispatchType;
             console.log("列表页保存参数",params);
             dispatch({
              type: 'listMakeModel/saveListSetting',
              payload: params,
              callback: () =>　{
                const { success, msg } = this.props.datachange;
                if(success) {
                  message.success(msg);
                  router.push({
                    pathname: '/ConfigureCenter/PageConfigure/ListMakeHome',
                  });
                }
                else {
                  message.error(msg);
                }
              },
            });
       
        
       }

  render() {//*************************
  
    const {searchForm,columns,isEdit,isDelete,isView,isRecover,initOption,editPath,dispatchType}=this.state;
    const {OtherOpeIndex,OtherOpeDispatch,OtherOpeLabel,OtherRouteLabel,OtherRouteDispatch}=this.props.location.params;
    console.log("ListPreviewRenderState",this.state);
    return (
      <PageHeaderWrapper >
         <Card bordered={false}>
            <ManageList
              dispatchType={dispatchType}
              initOption={initOption}
              columns={columns}
              match={this.props.match}
              stateData="dataList"
              searchForm={searchForm}
              editPath={''}
              viewPath={''}
              deleteDispatch={''}
              recoverDispatch={''}
              isEdit={isEdit}
              isDelete={isDelete}
              isView={isView}
              isRecover={isRecover}
              OtherOpeDispatch={''}
              OtherOpeLabel={OtherOpeLabel}
            > 
            </ManageList>
            <FooterToolbar>
              <Button onClick={this.save}>
                保存
              </Button>
              <Link to={{ pathname: "ListMake"}}>
              <Button>
                返回
              </Button>
              </Link>
              </FooterToolbar>
        </Card>
        </PageHeaderWrapper >
    );
  }
}

export default connect(({ listMakeModel }) => ({
  datachange: listMakeModel.datachange, 
}))(Form.create()(ListMakePreview))
