import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { routerRedux, Route, Switch } from 'dva/router';
import {router} from 'umi';
import { Table, Row, Col, Card, Form, Input, Select, Radio,Spin,Checkbox,DatePicker,Upload,InputNumber,Button,message} from 'antd';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import DynamicTable from './DynamicTable';
import BraftEditor from 'braft-editor';
import FooterToolbar from '../../components/FooterToolbar';
import styles from './style.less';


const Option = Select.Option;
const FormItem = Form.Item;

const { TextArea } = Input;

class ManageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      fileName:'',
      isEditAddSpecialProper:false,
      newSourceSetting:[],
    };
  }
    componentDidMount() {
        const {dispatch}=this.props;
        const{ SourceSetting,id,dispatchType,initparams,dataNewProper,isNew,newParam,newDispatchType}=this.props;
        console.log("ManageEditprops",this.props);
        if(!isNew){
          console.log("enterdispatchbefore");
        dispatch({
            type: dispatchType,
            payload: initparams,
        });
      }
      if(isNew&&newParam){
        dispatch({
          type: newDispatchType,
          payload: newParam,
          callback:()=>{
            let { SourceSetting,dataNewProper,isNew,newParam,newDispatchType}=this.props;
            console.log("this.props",this.props);
            if(isNew&&dataNewProper&&dataNewProper.specialProperty){
              console.log("enterNewdataProper");
              let lastindex=SourceSetting.length;
              let specialPropertySet=[];
              for(let i=0;i<dataNewProper.specialProperty.length;i++){
                specialPropertySet.push({
                    name: dataNewProper.specialProperty[i].name,
                    field: dataNewProper.specialProperty[i].field,
                    isRequired: dataNewProper.specialProperty[i].isRequired,
                    disabled: dataNewProper.specialProperty[i].disabled,
                    defaultValue: dataNewProper.specialProperty[i].defaultValue,
                    component: dataNewProper.specialProperty[i].component,
                });
              }
              SourceSetting.push({
                index:lastindex,name:"SpecialPropertyInfo",title:"SpecialPropertyInfo",displayMethod:"Form",
                FormSet:specialPropertySet});
                console.log("SourceSetting",SourceSetting);
                this.setState({
                  newSourceSetting:SourceSetting,
                })
            }
          }
      })
      }
    }

    handleChangeEditor = (content) => {
      this.setState({
        contentEditor: content,
      });
    }
    handleRawChange = (rawContent) => {
      console.log(rawContent);
    }

    handleChange = (info) => {
      console.log(info);
  
      let fileList = info.fileList;
      //下一行控制只显示最后一个文件
      fileList = fileList.slice(-1);
      fileList = fileList.filter((file) => {
        if (file.status === 'error') {
          return false;
        }
        return true;
      });
      fileList = fileList.filter((file) => {
        if (file.response && typeof data == 'object') {
          console.log(file.response.success);
          if( file.response.success === false ) {
            message.error(file.response.msg);
            return false;
          }
          return true;
        }
        return true;
      });
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.obj[0];
          // file.url = file.response.url;
          this.setState({
            fileName:  file.name,
          })
        }
        return file;
      });
      console.log(fileList);
      this.setState({ fileList,});
    }

    renderDetail=(values)=>{
      let {getFieldDecorator,getFieldValue}=this.props.form;
      const editorProps = {
        height: 350,
        contentFormat: 'html',
        // initialContent: line ? line.introduction : '',
        onChange: this.handleChangeEditor,
        onRawChange: this.handleRawChange,
        media: {
          allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
          image: true, // 开启图片插入功能
          video: true, // 开启视频插入功能
          audio: true, // 开启音频插入功能
          validateFn: null, // 指定本地校验函数，说明见下文
          uploadFn: uploadFn, // 指定上传函数，说明见下文
          removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
          onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
          onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
          onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
        },
      }

      const uploadFn = (param) => {

        const serverURL = '/hyapi/resource/video/upload'
        const xhr = new XMLHttpRequest
        const fd = new FormData()
    
        // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
        console.log(param.libraryId)
    
        const successFn = (response) => {
          // 假设服务端直接返回文件上传后的地址
          // 上传成功后调用param.success并传入上传后的文件地址
          param.success({
            // url: xhr.responseText,
            url: JSON.parse(xhr.responseText).obj[0],
            meta: {
              id: 'xxx',
              title: 'xxx',
              alt: 'xxx',
              loop: false, // 指定音视频是否循环播放
              autoPlay: false, // 指定音视频是否自动播放
              controls: true, // 指定音视频是否显示控制栏
              // poster: 'http://xxx/xx.png', // 指定视频播放器的封面
              poster: null, // 指定视频播放器的封面
            },
          });
        };
    
        const progressFn = (event) => {
          // 上传进度发生变化时调用param.progress
          param.progress(event.loaded / event.total * 100)
        };
    
        const errorFn = (response) => {
          // 上传发生错误时调用param.error
          param.error({
            msg: 'unable to upload.',
          });
        };
    
        xhr.upload.addEventListener("progress", progressFn, false);
        xhr.addEventListener("load", successFn, false);
        xhr.addEventListener("error", errorFn, false);
        xhr.addEventListener("abort", errorFn, false);
    
        fd.append('files', param.file);
        xhr.open('POST', serverURL, true);
        xhr.send(fd);
    
      };

        let {dataEdit,loading,isNew,dataNewProper,saveEditDispatch,dispatch}=this.props;
       
        console.log("renderEdidataDetail",dataEdit,"renderEditvalues",values,"loading",loading);
        let data=dataEdit[values.name];
    
        let options=[],tempoptions;
        if(values.displayMethod=="Form")
        {
          //若有特殊属性，根据特殊属性渲染
          if(!isNew&&data&&data.specialProperty&&this.state.isEditAddSpecialProper==false&&saveEditDispatch!=''){
            let specialPropertydata=JSON.parse(JSON.stringify(data.specialProperty));
            console.log("specialPropertydata",specialPropertydata);
           for(var i=0;i<specialPropertydata.length;i++){
           values.FormSet.push({
            name: specialPropertydata[i].name,
            field: specialPropertydata[i].field,
            isRequired: specialPropertydata[i].isRequired,
            disabled: specialPropertydata[i].disabled,
            defaultValue:specialPropertydata[i].defaultValue,
            component:specialPropertydata[i].component,
            }) 
           }
           this.setState({
             isEditAddSpecialProper:true,
           })
          }
          console.log("entereditdata",data,"FormSet",values);
          return loading&&!isNew?<Spin/>:
          values.FormSet.map(item=>{
            switch (item.component){
              case "Input":
                return  <FormItem
                  label={item.name}>
                  {
                    getFieldDecorator(`${item.field}`, {
                      initialValue:isNew?item.defaultValue:data[item.field],
                      rules: [{ required: item.isRequired=="是"?true:false, }],
                    })(<Input  disabled={item.disabled}/>)
                  }
                </FormItem>
              case "TextArea":
                return  <FormItem
                    label={item.name}>
                  {
                    getFieldDecorator(`${item.field}`, {
                      initialValue:isNew?item.defaultValue:data[item.field],
                      rules: [{ required: item.isRequired=="是"?true:false, }],
                    })(  <TextArea rows={4} />)
                  }
                </FormItem>
              case "InputNumber":
                return  <FormItem
                    label={item.name}>
                  {
                    getFieldDecorator(`${item.field}`, {
                      initialValue:isNew?item.defaultValue:data[item.field],
                      rules: [{ required: item.isRequired=="是"?true:false, }],
                    })(  <InputNumber disabled={item.disabled}/>)
                  }
                </FormItem>
              case "Select":
                tempoptions=item.options.split('#');
                for(let i=0;i<tempoptions.length;i++){
                  let opt={};
                  opt.value=tempoptions[i].split('-')[0];
                  opt.text=tempoptions[i].split('-')[1];
                  options.push(opt);
                }
                  return  <FormItem
                      label={item.name}>
                    {
                      getFieldDecorator(`${item.field}`, {
                        initialValue:isNew?item.defaultValue:data[item.field],
                        rules: [{ required: item.isRequired=="是"?true:false, }],
                      })( <Select  style={{ width: item.wrapperWidth }} disabled={item.disabled}>
                        {
                            options.map(item=>
                                <Option value={item.value}>{item.text}</Option>
                            )
                        }
                    </Select>)
                    }
                  </FormItem>
              case "Switch":
                    return  <FormItem
                        label={item.name}>
                      {
                        getFieldDecorator(`${item.field}`, {
                          initialValue:isNew?item.defaultValue:data[item.field],
                          rules: [{ required: item.isRequired=="是"?true:false, }],
                        })( <Switch />)
                      }
                    </FormItem>
              case "DatePicker":
                    return  <FormItem
                        label={item.name}>
                      {
                        getFieldDecorator(`${item.field}`, {
                          initialValue:isNew?moment(item.defaultValue):moment(data[item.field]),
                          rules: [{ required: item.isRequired=="是"?true:false, }],
                        })( <DatePicker />)
                      }
                    </FormItem>
              case "TimePicker":
                    return  <FormItem
                        label={item.name}>
                      {
                        getFieldDecorator(`${item.field}`, {
                          initialValue:isNew?item.defaultValue:data[item.field],
                          rules: [{ required: item.isRequired=="是"?true:false, }],
                        })( <TimePicker />)
                      }
                    </FormItem>
              case "Radio":
                    tempoptions=item.options.split('#');
                    for(let i=0;i<tempoptions.length;i++){
                      let opt={};
                      opt.value=tempoptions[i].split('-')[0];
                      opt.text=tempoptions[i].split('-')[1];
                      options.push(opt);
                    }
                    return  <FormItem
                        label={item.name}>
                      {
                        getFieldDecorator(`${item.field}`, {
                          initialValue:isNew?item.defaultValue:data[item.field],
                          rules: [{ required: item.isRequired=="是"?true:false, }],
                        })( <Radio.Group>
                          {options.map(item=>
                            <Radio value={item.value}>{item.text}</Radio>
                            )}
                        </Radio.Group>)
                      }
                    </FormItem>
              case "CheckBox":
                  tempoptions=item.options.split('#');
                  for(let i=0;i<tempoptions.length;i++){
                    let opt={};
                    opt.value=tempoptions[i].split('-')[0];
                    opt.label=tempoptions[i].split('-')[1];
                    options.push(opt);
                  }
                  return  <FormItem
                      label={item.name}>
                    {
                      getFieldDecorator(`${item.field}`, {
                        initialValue:isNew?item.defaultValue:data[item.field],
                        rules: [{ required: item.isRequired=="是"?true:false, }],
                      })( <Checkbox.Group
                        options={options}
                      />)
                    }
                  </FormItem>
              case "BraftEditor":
                    return  <FormItem
                        label={item.name}>
                    <div>
                    <BraftEditor {...editorProps} />
                  </div>
                    </FormItem>
              case "Upload":
                    return   <FormItem
                        label={item.name}>
                      {
                        getFieldDecorator(`${item.field}`, {
                          initialValue:isNew?item.defaultValue:data[item.field],
                          rules: [{ required: item.isRequired=="是"?true:false, }],
                        })(                   <Upload
                          className={styles.uploadInline}
                          name="files"
                          action="/hyapi/resource/file/upload"
                          onChange={this.handleChange}
                          fileList={this.state.fileList}
                          headers={{'X-Requested-With' : null}}
                        >
                          <Button>
                            <Icon type="upload" /> 上传文件
                          </Button>
                        </Upload>)
                      }
                    </FormItem>
            }
          })
        }else{
          data.map((item,index)=>{item.key=index;})
          console.log("dynamictableData",data);
          return <FormItem
          label={values.title}
        >
          {getFieldDecorator(`${values.name}`, {
                  initialValue: data,
                })
            (<DynamicTable  setting={values.DynamicSet} />)}
        </FormItem>
        
        }
  }

    submitHandler = (e) => {
      let {saveHandler,isNew,saveNewDispatch,saveEditDispatch}=this.props;
      console.log("entersubmithandler",this.props);
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if(err) return;
        if(saveHandler){//外部调用保存方法
          saveHandler(values);
        }else if(isNew){//内部调用保存方法
          console.log("entersaveNewdispatch");
          this.props.dispatch({
            type:  "ManageEditModel/saveNewTypeConfigure",
            payload: values,
            callback: () => {
              const { success, msg } = this.props.datachange;
              if(success) message.success(msg);
              else message.error(msg);
            },
          })
      }else{
        console.log("entersaveEditdispatch");
          this.props.dispatch({
            type: saveEditDispatch,
            payload: values,
            callback: () => {
              const { success, msg } = this.props.datachange;
              if(success) message.success(msg);
              else message.error(msg);
            },
          })
      }
      });
    }

    returnHandler = () => {
      let {returnPath}=this.props;
      router.push({
        pathname: returnPath,
      })
    }


    render() {
        const { SourceSetting,dataEdit,id,dispatchType,initparams,loading,returnPath,isNew,dataNewProper}=this.props;
        console.log("renderManageEditprops",this.props,"renderManageEditstate",this.state);
       let realSourceSetting=this.state.newSourceSetting.length==0?SourceSetting:this.state.newSourceSetting;
        return (
            <PageHeaderWrapper>
              <Form onSubmit={this.submitHandler}>
             {loading&&!isNew?<Spin/>: 
               realSourceSetting.map(item=>{
              return  <Card bordered={false} title={item.title}>
                
                  {this.renderDetail(item)}
                
                </Card>
               })
             }
            { 
            
            returnPath?
            <FooterToolbar> 
                    <Button type="primary" htmlType="submit" >保存</Button >
                    <Button type="primary" onClick={this.returnHandler}>返回</Button >
                </FooterToolbar>
                :<span/>
               }
               </Form>
            </PageHeaderWrapper>
        );
    }
}
export default connect(({ ManageEditModel }) => ({
    dataEdit: ManageEditModel.dataEdit.obj,//编辑页数据源
    dataNewProper: ManageEditModel.dataNewProper.obj,//新建页面特殊属性信息
    datachange:ManageEditModel.datachange,
    loading: ManageEditModel.loading,
}))(Form.create()(ManageEdit))