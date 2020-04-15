import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageDetail from '../../components/ManageDetail';
import localStorageDB from 'localstoragedb';



@Form.create()
class CoopDetail extends PureComponent {

  state = {  
    roleList:[],
    editSetting:[],
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const { isEnabled } = this.state;
    const values = {
      isEnabled,
    };
    let db=new localStorageDB("myDB",localStorage);
    let result=db.queryAll("DetailSetting", {
      query: {moduleID: 0}
    });
    console.log("userdbDetailquery",result);
    if(!result[0].timestamp){
    dispatch({
        type: 'detailMakeModel/fetchDetailSetting',
        payload:0,
        callback:()=>{
          let {detailSetting}=this.props;
          db.insertOrUpdate("DetailSetting",{moduleID:3},{setting:detailSetting});
          this.setState({
            editSetting,
          })     
        }
      });
    }
      dispatch({
        type: 'detailMakeModel/fetchDetailTimestamp',
        payload:0,
        callback:()=>{
          let {detailTimestamp:{timestamp}}=this.props;
          db.insertOrUpdate("DetailSetting",{moduleID:3},{timestamp:timestamp});
          let result=db.queryAll("EditSetting", {
            query: {moduleID: 0}
          });
          console.log("userdbDetailqueryafter",result);
          if(timestamp==result[0].timestamp){
            this.setState({
              detailSetting:result[0].setting,
            })
          }else if(result[0].timestamp!=''){
            dispatch({
              type: 'detailMakeModel/fetchDetailSetting',
              payload:0,
              callback:()=>{
                let {detailSetting}=this.props;
                db.insertOrUpdate("DetailSetting",{moduleID:3},{setting:detailSetting});
                this.setState({
                  detailSetting,
                })     
              }
            });
          }
        }
      });
    
    }


  render() {
    //公用属性信息，默认属性信息都可在配置页配置，
        let SourceSetting =[{
            index: 0,
            name: "CoopInfo",
            title: "CoopInfo",
            displayMethod: "list",
            listItemSet: [
                {name: "合作方名称",
            field: "supplierName"},
            {name: "创建人",
            field: "Operator"},
            {name: "创建日期",
            field: "Date"},
           ],
            bordered: true,
            itemLayout: "vertical",
            column: undefined,
        },
    ]
        return ( <ManageDetail
            dispatchType="ManageDetailModel/fetchCoopDetail"
            SourceSetting={SourceSetting}
            initparams={this.props.location.params.ViewParam.ID}
          > 
          </ManageDetail>
        )
}
}

export default connect(({ detailMakeModel }) => ({
  detailSetting: detailMakeModel.detailSetting.obj,
  detailTimestamp:detailMakeModel.detailTimestamp.obj,
  loading: detailMakeModel.loading,
}))(Form.create()(CoopDetail))
