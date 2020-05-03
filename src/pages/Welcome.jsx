import React,{Component} from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Typography, Alert, Form } from 'antd';
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
    type: 'localeConfModel/fetchzhcnConfigure',
    callback: () => {
      let { dataZhcn } = this.props;
      Object.assign(zhcn,dataZhcn);
    }
  });
  dispatch({
    type: 'localeConfModel/fetchzhtwConfigure',
    callback: () => {
      let { dataZhtw } = this.props;
      Object.assign(zhtw,dataZhtw);
    }
  })
  dispatch({
    type: 'localeConfModel/fetchenusConfigure',
    callback: () => {
      let { dataEnus } = this.props;
      Object.assign(zhcn,dataEnus);
    }
  })
  dispatch({
    type: 'localeConfModel/fetchptbrConfigure',
    callback: () => {
      let { dataPtbr } = this.props;
      Object.assign(ptbr,dataPtbr);
    }
  })
  dispatch({
    type: 'localeConfModel/fetchMyLocalConfigure',
    callback: () => {
      let { dataMyLocal } = this.props;
      for(let key in dataMyLocal){
        if(key!=''){//如果key有名字，即指定了自定义语言名
      Object.assign(myLocal,dataMyLocal[key]);
      }
    }
    }
  })
  }

  render(){
    return (
  <PageHeaderWrapper>
    <Card>
      <Alert
        message="umi ui 现已发布，点击右下角 umi 图标即可使用"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Typography.Text strong>
        <a target="_blank" rel="noopener noreferrer" href="https://pro.ant.design/docs/block">
          <FormattedMessage
            id="app.welcome.link.block-list"
           // defaultMessage="基于 block 开发，快速构建标准页面"
          />
        </a>
      </Typography.Text>
      <CodePreview> npm run ui</CodePreview>
      <Typography.Text
        strong
        style={{
          marginBottom: 12,
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://pro.ant.design/docs/available-script#npm-run-fetchblocks"
        >
        {/* <FormattedMessage id="app.welcome.link.fetch-blocks" defaultMessage="获取全部区块" /> */}
        {locale['app.welcome.link.block-list']}
        </a>
      </Typography.Text>
      <CodePreview> npm run fetch:blocks</CodePreview>
    </Card>
    <p
      style={{
        textAlign: 'center',
        marginTop: 24,
      }}
    >
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
    </p>
  </PageHeaderWrapper>
    )
  }
}
export default connect(({ localeConfModel }) => ({
  dataZhcn: localeConfModel.dataZhcn.obj,//列表页数据源
  dataZhtw: localeConfModel.dataZhtw.obj,
  dataEnus: localeConfModel.dataEnus.obj,
  dataPtbr: localeConfModel.dataPtbr.obj,
  dataMyLocal: localeConfModel.dataMyLocal.obj,
  loading: localeConfModel.loading,
}))(Form.create()(Welcome))
