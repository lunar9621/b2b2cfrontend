import React,{PureComponent} from 'react';
import {connect} from 'dva';
import {Link } from 'dva/router';
import { routerRedux, Route, Switch } from 'dva/router';
import { Table,Row, Col, Card, Form, Icon, Select, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message,Divider, Tooltip,Radio  } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ManageList from '../../components/ManageList';
import FooterToolbar from '../../components/FooterToolbar';
const Option = Select.Option;
const FormItem = Form.Item;

@Form.create()
export default  class ListMakePreview  extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isRender:false,
      searchForm:[],
      columns:[  {
        title: '',
        dataIndex: '',
        key: '',
    }, ],
    editPath:'',
    isEdit:false,
    isDelete:false,
    isView:false,
    isRecover:false,
    otherOpe:null,
    dispatchType:this.props.location.params.dispatchType,
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
    let otherOpe=null;
    if(this.props.location.params.OtherOpe){
      otherOpe=this.props.location,params.OtherOpe;
    }
    this.setState({
      searchForm,
      columns,
      isRender:true,
      isEdit,
      isDelete,
      isView,
      isRecover,
      editPath,
      otherOpe,
      dispatchType,
      initOption,
      id
    });
       }

       save=()=>{

         let params=JSON.parse(JSON.stringify(this.state));
         console.log("保存参数",params);
       }

  render() {//*************************
  
    const {searchForm,columns,isEdit,isDelete,isView,isRecover,initOption,editPath,dispatchType}=this.state;
    const {OtherOpeIndex,OtherOpeDispatch,OtherOpeLabel}=this.props.location.params;
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
