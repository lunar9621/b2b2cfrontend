import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageDetail from '../../components/ManageDetail';
import localStorageDB from 'localstoragedb';



@Form.create()
class DepartmentDetail extends PureComponent {

  state = {  
    roleList:[],
    detailSetting:{moduleID:'',
  SourceSetting:[],
ButtonSetting:[]},
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
    // if(!result[0].timestamp){
    // dispatch({
    //     type: 'detailMakeModel/fetchDetailSetting',
    //     payload:0,
    //     callback:()=>{
    //       let {detailSetting}=this.props;
    //       db.insertOrUpdate("DetailSetting",{moduleID:2},{setting:detailSetting});
    //       this.setState({
    //         editSetting,
    //       })     
    //     }
    //   });
    // }
    //   dispatch({
    //     type: 'detailMakeModel/fetchDetailTimestamp',
    //     payload:0,
    //     callback:()=>{
    //       let {detailTimestamp:{timestamp}}=this.props;
    //       db.insertOrUpdate("DetailSetting",{moduleID:2},{timestamp:timestamp});
    //       let result=db.queryAll("EditSetting", {
    //         query: {moduleID: 0}
    //       });
    //       console.log("userdbDetailqueryafter",result);
    //       if(timestamp==result[0].timestamp){
    //         this.setState({
    //           detailSetting:result[0].setting,
    //         })
    //       }else if(result[0].timestamp!=''){
    //         dispatch({
    //           type: 'detailMakeModel/fetchDetailSetting',
    //           payload:0,
    //           callback:()=>{
    //             let {detailSetting}=this.props;
    //             db.insertOrUpdate("DetailSetting",{moduleID:2},{setting:detailSetting});
    //             this.setState({
    //               detailSetting,
    //             })     
    //           }
    //         });
    //       }
    //     }
    //   });
    dispatch({
      type: 'detailMakeModel/fetchDetailSetting',
      payload:2,
      callback:()=>{
        let {detailSetting}=this.props;
        db.insertOrUpdate("DetailSetting",{moduleID:2},{setting:detailSetting});
        this.setState({
          detailSetting,
        })     
      }
    });
    }


  render() {
    let {SourceSetting=[],ButtonSetting=[]}=this.state.detailSetting;
    console.log("DepartmentDetailState",this.state);
    //     let SourceSetting =[{
    //         index: 0,
    //         name: "DepartmentInfo",
    //         title: "DepartmentInfo",
    //         displayMethod: "list",
    //         listItemSet: [
    //             {name: "部门名称",
    //         field: "name"},
    //         {name: "上级部门",
    //         field: "leadDep"},
    //         {name: "部门主管",
    //         field: "manager"},
    //         {name: "人数",
    //         field: "count"},
    //         {name: "创立时间",
    //         field: "buildTime"},
    //        ],
    //         bordered: true,
    //         itemLayout: "vertical",
    //         column: undefined,
    //     },
    //     {
    //         index: 1,
    //         name: "DepartmentStaffInfo",
    //         title: "DepartmentStaffInfo",
    //         displayMethod: "table",
    //         tableColumnSet: [
    //             {name: "职员名称",
    //             field: "name",
    //             align: "中"},
    //             {name: "职员性别",
    //             field: "sex",
    //             align: "中"},
    //             {name: "职员编号",
    //             field: "staffID",
    //             align: "中"},
    //        ],
    //         bordered: true,
    //         itemLayout: "vertical",
    //         column: undefined,
    //     },
    // ]
        return ( <ManageDetail
            dispatchType="ManageDetailModel/fetchDepartmentDetail"
            SourceSetting={SourceSetting}
            initparams={this.props.location.params.ViewParam.ID}
            returnPath="/DepartmentManage"
          > 
          </ManageDetail>
        )
}
}

export default connect(({ detailMakeModel }) => ({
  detailSetting: detailMakeModel.detailSetting.obj,
  detailTimestamp:detailMakeModel.detailTimestamp.obj,
  loading: detailMakeModel.loading,
}))(Form.create()(DepartmentDetail))
