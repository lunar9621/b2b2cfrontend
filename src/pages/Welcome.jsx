import React,{Component} from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Typography, Alert, Form,List } from 'antd';
import { connect } from 'dva';
import styles from './Welcome.less';
import zhcn from '../locales/zh-CN';
import enus from '../locales/en-US';
import zhtw from '../locales/zh-TW';
import ptbr from '../locales/pt-BR';
import myLocal from '../locales/myLocal';
import localStorageDB from 'localstoragedb';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);
let storage=window.localStorage;
let locale=zhcn;
class Welcome extends Component{
  constructor(props) {
    super(props);
  }

 componentDidMount(){
   console.log("window.routes",window._routes);
  console.log("props", this.props);
  const { dispatch } = this.props;

let db=new localStorageDB("myDB",localStorage);
//if(db.isNew()){
  console.log("enter");
  if(!db.tableExists("ListSetting")){
  db.createTable("ListSetting",["moduleID","timestamp","setting"]);
  }
  db.insertOrUpdate("ListSetting", {moduleID:0},{moduleID: 0, timestamp:'', setting: ''});
  db.insertOrUpdate("ListSetting", {moduleID:3},{moduleID: 3, timestamp:'', setting: ''});
  if(!db.tableExists("DetailSetting")){
  db.createTable("DetailSetting",["moduleID","timestamp","setting"]);
  }
  db.insertOrUpdate("DetailSetting", {moduleID:0},{moduleID: 0, timestamp:'', setting: ''});
  if(!db.tableExists("EditSetting")){
  db.createTable("EditSetting",["moduleID","timestamp","setting"]);
  }
  db.insertOrUpdate("EditSetting", {moduleID:0},{moduleID: 0, timestamp:'', setting: ''});
  //db.deleteRows("EditSetting",{ID:2});
  db.commit();
//}
let result=db.queryAll("ListSetting", {
  query: {moduleID: 0}
});
console.log("queryresult",result);
  if(storage.locale=="zh-CN"){
   locale=zhcn;
  }else if(storage.locale=="zh-TW"){
    locale=zhtw;
  }else if(storage.locale=="en-US"){
    locale=enus;
  }else{
    locale=ptbr;
  }
  dispatch({
    type: 'localeConfModel/fetchLocalConfigure',
    callback: () => {
      let { dataLocal } = this.props;
     // Object.assign(zhcn,dataLocal);
    }
  });
  // dispatch({
  //   type: 'localeConfModel/fetchzhcnConfigure',
  //   callback: () => {
  //     let { dataZhcn } = this.props;
  //     Object.assign(zhcn,dataZhcn);
  //   }
  // });
  // dispatch({
  //   type: 'localeConfModel/fetchzhtwConfigure',
  //   callback: () => {
  //     let { dataZhtw } = this.props;
  //     Object.assign(zhtw,dataZhtw);
  //   }
  // })
  // dispatch({
  //   type: 'localeConfModel/fetchenusConfigure',
  //   callback: () => {
  //     let { dataEnus } = this.props;
  //     Object.assign(zhcn,dataEnus);
  //   }
  // })
  // dispatch({
  //   type: 'localeConfModel/fetchptbrConfigure',
  //   callback: () => {
  //     let { dataPtbr } = this.props;
  //     Object.assign(ptbr,dataPtbr);
  //   }
  // })
  // dispatch({
  //   type: 'localeConfModel/fetchMyLocalConfigure',
  //   callback: () => {
  //     let { dataMyLocal } = this.props;
  //     for(let key in dataMyLocal){
  //       if(key!=''){//如果key有名字，即指定了自定义语言名
  //     Object.assign(myLocal,dataMyLocal[key]);
  //     }
  //   }
  //   }
  // })
  dispatch({
    type: 'noticeModel/fetchNotices',
  })
}

  render(){
    let {notices,noticeLoading}=this.props;
    console.log("welcomeprops",this.props);
    return (
  <PageHeaderWrapper>
    <Card title={locale.latestNotice} bordered={false}>
                <List
                  size="small"
                  bordered={false}
                  split={false}
                  dataSource={noticeLoading?[]:notices.rows}
                  // renderItem={item => (<List.Item actions={[<span>{moment(item.date).format("YYYY-MM-DD")}</span>]}>{item.title}</List.Item>)}
                  renderItem={item => (<List.Item > <List.Item.Meta
                    title={item.name}
                    description={item.content}
                  /></List.Item>)}
                />
    </Card>
  </PageHeaderWrapper>
    )
  }
}
export default connect(({ localeConfModel,noticeModel }) => ({
  dataLocal: localeConfModel.dataLocal.obj,//列表页数据源
  dataMyLocal: localeConfModel.dataMyLocal.obj,
  notices:noticeModel.noticeList.obj,
  noticeLoading:noticeModel.noticeLoading,
  loading: localeConfModel.loading,
}))(Form.create()(Welcome))
