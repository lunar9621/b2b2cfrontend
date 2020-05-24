import React from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { router } from 'umi';
import { Col, Row, Card, Form, Input, InputNumber, Button, Radio, message, Select, Upload, Icon, Cascader, Collapse, DatePicker, Divider, Checkbox } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FooterToolbar from '../../components/FooterToolbar';
import styles from './SupplierPurchase.less';
import ManageEditModel from '@/models/ManageEditModel';

const FormItem = Form.Item;
const Panel = Collapse.Panel;
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const { RangePicker } = DatePicker;

const phonevalidator = (rule, value, callback) => {
  var re = /^\d{11}$|^\d{3}\-\d{8}$|^\d{4}\-\d{7}$/;
  if (value && !re.test(value)) {
    callback('请输入11位完整手机号！');
  } else {
    callback();
  }
}

 class ContractEdit extends React.Component {

  state = {
    functionsItem: [],
    id: null,
    isLine: false,
    isCaigouqian: false,
    fileList: [],
    dateN: null,
    helpSettle: null,
    validateStatusSettle: null,
  }

  componentDidMount() {
    if(this.props.location.params) {
      this.setState({ 
        id: this.props.location.params.id,
        isLine: this.props.location.params.isLine,
        isCaigouqian: this.props.location.params.isCaigouqian,
      });
      this.props.form.setFieldsValue({supplierId: this.state.id});
    }
  }
  
  returnHandler = () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch(routerRedux.push({ pathname: 'Detail', params: { id, isEdit: true } }));
  }

  handleChange = (info) => {
    let fileList = info.fileList;
    fileList = fileList.slice(-1);
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.obj[0];
        file.name = '微信二维码';
      }
      return file;
    });
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.success === true;
      }
      return true;
    });
    this.setState({ fileList });
  }

  handleSettleRadioChange = (e) => {
    let radioValue = e.target.value;
    this.setState({
      dateN: null,
    });
    if(radioValue === 'tjiaN') {
      this.setState({
        helpSettle: '请输入周期N',
        validateStatusSettle: 'error',
      });
    } else {
      this.setState({
        helpSettle: null,
        validateStatusSettle: null,
      });
    }
  }
  handleSettleInputChange = (e) => {
    if(e != null && typeof(e) != 'undefined') {
      this.setState({
        dateN: e,
        helpSettle: null,
        validateStatusSettle: null,
      });
    } else {
      this.setState({
        helpSettle: '请输入周期N',
        validateStatusSettle: 'error',
      });
    }
  }

  qicheDeductComponent() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <Col lg={12} md={24} className={styles.colFormInLine}>
        <Form.Item label="汽车线路扣点">
          {getFieldDecorator('deductQiche', {
            rules: [{ required: true, message: '请选择汽车线路扣点' }],
          })(
            <Radio.Group style={{ float: 'left' }}>
              <Radio value='tuanke'>团客散客</Radio>
              <Radio value='rentou'>人头扣点</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('rentouQiche', {
            rules: getFieldValue('deductQiche') === 'rentou' ?
            [{ required: true, message: '请输入人头扣点' }]
            : [{}],
          })(
            <span style={{ display: getFieldValue('deductQiche') === 'rentou' ? 'inline-block' : 'none', marginTop: 32 }}>
              <InputNumber placeholder="人头扣点" min={0} />
              <span>元/人</span>
            </span>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('tuankeQiche', {
            rules: getFieldValue('deductQiche') === 'tuanke' ?
            [{ required: true, message: '请输入团客扣点' }]
            : [{}],
          })(
            <span style={{ display: getFieldValue('deductQiche') === 'tuanke' ? 'inline-block' : 'none', marginRight: 8, marginTop: 32 }}>
              <InputNumber placeholder="团客扣点" min={0} max={100} />
              <span>%</span>
            </span>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('sankeQiche', {
            rules: getFieldValue('deductQiche') === 'tuanke' ?
            [{ required: true, message: '请输入散客扣点' }]
            : [{}],
          })(
            <span style={{ display: getFieldValue('deductQiche') === 'tuanke' ? 'inline-block' : 'none', marginTop: 32 }}>
              <InputNumber placeholder="散客扣点" min={0} max={100} />
              <span>%</span>
            </span>
          )}
        </Form.Item>
      </Col>
    );
  }
  qicheQuyuComponent() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let { province } = this.props;
    let optionsProvince = province.map(d => <Option value={d.id}>{d.name}</Option>);
    return (
      <Col lg={{ span: 12 }} md={{ span: 24 }}>
        <FormItem label="汽车区域限定">
          {getFieldDecorator('qcAreas', {
            rules: [{ required: true, message: '请选择汽车区域' }],
          })(
            <Select
              mode="multiple"
              placeholder="请选择汽车区域限定"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
            >
              {optionsProvince}
            </Select>
          )}
        </FormItem>
      </Col>
    );
  }
  guoneiDeductComponent() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <Col lg={12} md={24} className={styles.colFormInLine}>
        <Form.Item label="国内线路扣点">
          {getFieldDecorator('deductGuonei', {
            rules: [{ required: true, message: '请选择国内线路扣点' }],
          })(
            <Radio.Group>
              <Radio value='tuanke'>团客散客</Radio>
              <Radio value='rentou'>人头扣点</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('tuankeGuonei', {
            rules: getFieldValue('deductGuonei') === 'tuanke' ?
            [{ required: true, message: '请输入团客扣点' }]
            : [{}],
          })(
            <span style={{ display: getFieldValue('deductGuonei') === 'tuanke' ? 'block' : 'none', marginTop: 32, marginRight: 8 }}>
              <InputNumber placeholder="团客扣点" min={0} max={100} />
              <span>%</span>
            </span>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('sankeGuonei', {
            rules: getFieldValue('deductGuonei') === 'tuanke' ?
            [{ required: true, message: '请输入散客扣点' }]
            : [{}],
          })(
            <span style={{ display: getFieldValue('deductGuonei') === 'tuanke' ? 'block' : 'none', marginTop: 32 }}>
              <InputNumber placeholder="散客扣点" min={0} max={100} />
              <span>%</span>
            </span>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('rentouGuonei', {
            rules: getFieldValue('deductGuonei') === 'rentou' ?
            [{ required: true, message: '请输入人头扣点' }]
            : [{}],
          })(
            <span style={{ display: getFieldValue('deductGuonei') === 'rentou' ? 'block' : 'none', marginTop: 32 }}>
              <InputNumber placeholder="人头扣点" min={0} />
              <span>元/人</span>
            </span>
          )}
        </Form.Item>
      </Col>
    );
  }
  guoneiQuyuComponent() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let { province } = this.props;
    let optionsProvince = province.map(d => <Option value={d.id}>{d.name}</Option>);
    return (
      <Col lg={{ span: 12 }} md={{ span: 24 }}>
        <FormItem label="国内区域限定">
          {getFieldDecorator('gnAreas', {
            rules: [{ required: true, message: '请选择国内区域' }],
          })(
            <Select
              mode="multiple"
              placeholder="请选择国内区域限定"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
            >
              {optionsProvince}
            </Select>
          )}
        </FormItem>
      </Col>
    );
  }
  chujingDeductComponent() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <Col lg={12} md={24} className={styles.colFormInLine}>
        <Form.Item label="出境线路扣点">
          {getFieldDecorator('deductChujing', {
            rules: [{ required: true, message: '请选择出境线路扣点' }],
          })(
            <Radio.Group style={{ float: 'left' }}>
              <Radio value='tuanke'>团客散客</Radio>
              <Radio value='rentou'>人头扣点</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('tuankeChujing', {
            rules: getFieldValue('deductChujing') === 'tuanke' ?
            [{ required: true, message: '请输入团客扣点' }]
            : [{}],
          })(
            <span style={{ display: getFieldValue('deductChujing') === 'tuanke' ? 'block' : 'none', marginTop: 32, marginRight: 8 }}>
              <InputNumber placeholder="团客扣点" min={0} max={100} />
              <span>%</span>
            </span>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('sankeChujing', {
            rules: getFieldValue('deductChujing') === 'tuanke' ?
            [{ required: true, message: '请输入散客扣点' }]
            : [{}],
          })(
            <span style={{ display: getFieldValue('deductChujing') === 'tuanke' ? 'block' : 'none', marginTop: 32 }}>
              <InputNumber placeholder="散客扣点" min={0} max={100} />
              <span>%</span>
            </span>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('rentouChujing', {
            rules: getFieldValue('deductChujing') === 'rentou' ?
            [{ required: true, message: '请输入人头扣点' }]
            : [{}],
          })(
            <span style={{ display: getFieldValue('deductChujing') === 'rentou' ? 'block' : 'none', marginTop: 32 }}>
              <InputNumber placeholder="人头扣点" min={0} />
              <span>元/人</span>
            </span>
          )}
        </Form.Item>
      </Col>
    );
  }
  chujingQuyuComponent() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let { country } = this.props;
    let optionsCountry = country.map(d => <Option value={d.id}>{d.name}</Option>);
    return (
      <Col lg={{ span: 12 }} md={{ span: 24 }}>
        <FormItem label="出境区域限定">
          {getFieldDecorator('cjAreas', {
            rules: [{ required: true, message: '请选择出境区域' }],
          })(
            <Select
              mode="multiple"
              placeholder="请选择出境区域限定"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
            >
              {optionsCountry}
            </Select>
          )}
        </FormItem>
      </Col>
    );
  }
  piaowuDeductComponent() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <Col lg={{ span: 12 }} md={{ span: 24 }} className={styles.colFormInLine}>
        <Form.Item label="票务扣点方式">
          {getFieldDecorator('deductPiaowu', {
            rules: [{ required: true, message: '请选择票务扣点' }],
          })(
            <Radio.Group style={{ float: 'left' }}>
              <Radio value='liushui'>流水扣点</Radio>
              <Radio value='rentou'>人头扣点</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('liushuiPiaowu', {
            rules: getFieldValue('deductPiaowu') === 'liushui' ?
              [{ required: true, message: '请输入流水扣点' }]
              : [{}],
          })(
            <span style={{ display: getFieldValue('deductPiaowu') === 'liushui' ? 'block' : 'none', marginTop: 32 }}>
              <InputNumber placeholder="流水扣点" min={0} />
              <span>%</span>
            </span>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('rentouPiaowu', {
            rules: getFieldValue('deductPiaowu') === 'rentou' ?
            [{ required: true, message: '请输入人头扣点' }]
            : [{}],
          })(
            <span style={{ display: getFieldValue('deductPiaowu') === 'rentou' ? 'block' : 'none', marginTop: 32 }}>
              <InputNumber placeholder="人头扣点" min={0} />
              <span>元/人</span>
            </span>
          )}
        </Form.Item>
      </Col>
    );
  }
  qianzhengDeductComponent() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <Col lg={{ span: 12 }} md={{ span: 24 }} className={styles.colFormInLine}>
        <Form.Item label="签证扣点方式">
          {getFieldDecorator('deductQianzheng', {
            rules: [{ required: true, message: '请选择签证扣点' }],
          })(
            <Radio.Group style={{ float: 'left' }}>
              <Radio value='liushui'>流水扣点</Radio>
              <Radio value='rentou'>人头扣点</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('liushuiQianzheng', {
            rules: getFieldValue('deductQianzheng') === 'liushui' ?
            [{ required: true, message: '请输入人头扣点' }]
            : [{}],
          })(
            <span style={{ display: getFieldValue('deductQianzheng') === 'liushui' ? 'block' : 'none', marginTop: 32 }}>
              <InputNumber placeholder="流水扣点" min={0} />
              <span>%</span>
            </span>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('rentouQianzheng', {
            rules: getFieldValue('deductQianzheng') === 'rentou' ?
            [{ required: true, message: '请输入人头扣点' }]
            : [{}],
          })(
            <span style={{ display: getFieldValue('deductQianzheng') === 'rentou' ? 'block' : 'none', marginTop: 32 }}>
              <InputNumber placeholder="人头扣点" min={0} />
              <span>元/人</span>
            </span>
          )}
        </Form.Item>
      </Col>
    );
  }
  rengouDeductComponent() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <Col lg={{ span: 12 }} md={{ span: 24 }} className={styles.colFormInLine}>
        <Form.Item label="认购门票扣点方式">
          {getFieldDecorator('deductRengou', {
            rules: [{ required: true, message: '请选择认购扣点' }],
          })(
            <Radio.Group style={{ float: 'left' }}>
              <Radio value='liushui'>流水扣点</Radio>
              <Radio value='rentou'>人头扣点</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('liushuiRengou', {
            rules: getFieldValue('deductRengou') === 'liushui' ?
            [{ required: true, message: '请输入人头扣点' }]
            : [{}],
          })(
            <span style={{ display: getFieldValue('deductRengou') === 'liushui' ? 'block' : 'none', marginTop: 32 }}>
              <InputNumber placeholder="流水扣点" min={0} />
              <span>%</span>
            </span>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('rentouRengou', {
            rules: getFieldValue('deductRengou') === 'rentou' ?
            [{ required: true, message: '请输入人头扣点' }]
            : [{}],
          })(
            <span style={{ display: getFieldValue('deductRengou') === 'rentou' ? 'block' : 'none', marginTop: 32 }}>
              <InputNumber placeholder="人头扣点" min={0} />
              <span>元/人</span>
            </span>
          )}
        </Form.Item>
      </Col>
    );
  }
  
  onFunctionsChange = (checkedValues) => {
    // console.log('checked = ', checkedValues);
    this.setState({
      functionsItem: checkedValues,
    });
  }
  
  functionsFormItem() {
    const {functionsItem} = this.state;
    // const { getFieldDecorator, getFieldValue } = this.props.form;
    // console.log(functionsItem);
    if(functionsItem.indexOf(0) != -1 && functionsItem.indexOf(1) != -1) {
      console.log("hh01");
      return (
        <div>
          <Row gutter={32}>
            {this.qicheQuyuComponent()}
            {this.qicheDeductComponent()}
          </Row>
          <Row gutter={32}>
            {this.rengouDeductComponent()}
          </Row>
        </div>
      );
    }
    if(functionsItem.indexOf(0) != -1) {
      console.log("hh0");
      return (
        <Row gutter={32}>
          {this.qicheQuyuComponent()}
          {this.qicheDeductComponent()}
        </Row>
      );
    }
    // if(functionsItem.indexOf(2) != -1 && functionsItem.indexOf(3) != -1 && functionsItem.indexOf(4) != -1) {
    //   console.log("hh234");
    //   return (
    //     <div>
    //       <Row gutter={32}>
    //         {this.guoneiQuyuComponent()}
    //         {this.guoneiDeductComponent()}
    //       </Row>
    //       <Row gutter={32}>
    //         {this.chujingQuyuComponent()}
    //         {this.chujingDeductComponent()}
    //       </Row>
    //       <Row gutter={32}>
    //         {this.qianzhengDeductComponent()}
    //       </Row>
    //     </div>
    //   );
    // }
    if(functionsItem.indexOf(2) != -1 && functionsItem.indexOf(3) != -1) {
      console.log("hh23");
      return (
        <div>
          <Row gutter={32}>
          {this.guoneiQuyuComponent()}
          {this.guoneiDeductComponent()}
          </Row>
          <Row gutter={32}>
            {this.chujingQuyuComponent()}
            {this.chujingDeductComponent()}
          </Row>
        </div>
      );
    }
    if(functionsItem.indexOf(2) != -1) {
      console.log("hh23");
      return (
        <div>
          <Row gutter={32}>
            {this.guoneiQuyuComponent()}
            {this.guoneiDeductComponent()}
          </Row>
        </div>
      );
    }
    // if(functionsItem.indexOf(3) != -1 && functionsItem.indexOf(4) != -1) {
    //   console.log("hh34");
    //   return (
    //     <div>
    //       <Row gutter={32}>
    //         {this.chujingQuyuComponent()}
    //         {this.chujingDeductComponent()}
    //       </Row>
    //       <Row gutter={32}>
    //         {this.qianzhengDeductComponent()}
    //       </Row>
    //     </div>
    //   );
    // }
    if(functionsItem.indexOf(3) != -1) {
      console.log("hh3");
      return (
        <Row gutter={32}>
          {this.chujingQuyuComponent()}
          {this.chujingDeductComponent()}
        </Row>
      );
    }
    if(functionsItem.indexOf(4) != -1) {
      console.log("hh4");
      return (
        <div>
          <Row gutter={32}>
            {this.qianzhengDeductComponent()}
          </Row>
        </div>
      );
    }
    if(functionsItem.indexOf(5) != -1) {
      console.log("hh5");
      return (
        <Row gutter={32}>
          {this.piaowuDeductComponent()}
        </Row>
      );
    }
  }

  functionsFormItem1() {
    const {functionsItem} = this.state;
    // const { getFieldValue } = this.props.form;
    // const functionsItem = getFieldValue('functions');
    let qicheComponent = <Row gutter={32}>
      {this.qicheQuyuComponent()}
      {this.qicheDeductComponent()}
    </Row>;
    let guoneiComponent = <Row gutter={32}>
      {this.guoneiQuyuComponent()}
      {this.guoneiDeductComponent()}
    </Row>;
    let chujingComponent = <Row gutter={32}>
      {this.chujingQuyuComponent()}
      {this.chujingDeductComponent()}
    </Row>;
    let rengouComponent = <Row gutter={32}>
      {this.rengouDeductComponent()}
    </Row>;
    let qianzhengComponent = <Row gutter={32}>
      {this.qianzhengDeductComponent()}
    </Row>;
    let piaowuComponent = <Row gutter={32}>
      {this.piaowuDeductComponent()}
    </Row>;
    return (
      <div>
        {functionsItem.indexOf(0) != -1 && qicheComponent}
        {functionsItem.indexOf(1) != -1 && rengouComponent}
        {functionsItem.indexOf(2) != -1 && guoneiComponent}
        {functionsItem.indexOf(3) != -1 && chujingComponent}
        {functionsItem.indexOf(4) != -1 && qianzhengComponent}
        {functionsItem.indexOf(5) != -1 && piaowuComponent}
      </div>
    );
  }

  render() {
    const { form, dispatch, submitloading, departmentList, roleList } = this.props;
    const { id, isCaigouqian, isLine } = this.state;
    
    const { getFieldDecorator, validateFieldsAndScroll, getFieldValue } = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        console.log(error);
        if (!error) {
          console.log(values);
          let data = {};
          for (const [key, value] of Object.entries(values)) {
            if(typeof(value) != "undefined" && value != null) {
              data[key] = value;
            }
          }
          if(values.settle == 'tjiaN' && !(values.dateN || values.dateN===0)){
            message.error('请输入t+N天数');
            return;
          }
          // if(values.settle == 'tjiaN'){
          //   data.dateN = this.state.dateN;
          // }
          data.startDate = (data.contractPeriod[0]).toISOString().slice(0,10);
          data.deadDate = (data.contractPeriod[1]).toISOString().slice(0,10);
          data.supplierId = id;
          delete data.contractPeriod;
          delete data.functions;
          if(this.state.fileList.length>0) {data.wechatUrl = this.state.fileList[0].url;}
          else {delete data.wechatUrl;}
          data.contractStatus="审核中";
          data.auditStatus="审核中";
          console.log(data);
          dispatch({
            type: 'ManageEditModel/SubmitToAudit',
            payload: data,
            callback: () => {
              const { res: { success, msg, obj } } = this.props;
              if(success){
                message.success(msg);
                router.push({
                  pathname: '/ContractManage',
                }) 
              }else{
                message.error(msg);          
              }
            },
          });
        }
      });
    };

   // const optionsDepartment = departmentList.map(d => <Option value={d.id} key={d.id.toString()}>{d.fullName}</Option>);

    return (
      <PageHeaderWrapper>
        <div className={styles.FooterToolbarContent}>
          <Form layout="horizontal">
            <Card bordered={false} className={styles.card} title="合同信息">
              <Row gutter={32}>
                <Col lg={12} md={24}>
                <Form.Item label="合同号">
                    {getFieldDecorator('contractCode', {
                      rules: [{ required: true, message: '请输入合同号' }],
                    })(
                      <Input placeholder="请输入合同号"  />
                      )}
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="结算周期" help={this.state.helpSettle} validateStatus={this.state.validateStatusSettle}>
                    <div>
                      {getFieldDecorator('settle', {
                        initialValue: 'yuejie',
                        rules: [{ required: true, message: '请选择结算周期' }],
                      })(
                        <Radio.Group style={{ float: 'left' }} onChange={this.handleSettleRadioChange}>
                          <Radio value='yuejie'>月结</Radio>
                          <Radio value='banyuejie'>半月结</Radio>
                          <Radio value='zhoujie'>周结</Radio>
                          <Radio value='shishijie'>实时结</Radio>
                          <Radio value='tjiaN'>t+N</Radio>
                        </Radio.Group>
                        )}
                      {getFieldDecorator('dateN')(
                        <span style={{ display: getFieldValue('settle') === 'tjiaN' ? 'block' : 'none', float: 'left' }}>
                          <InputNumber
                            placeholder="输入N"
                            precision={0}
                            // min={0}
                            onChange={this.handleSettleInputChange}
                            value={this.state.dateN}
                          />
                          <span>天</span>
                        </span>
                      )}
                      <div style={{clear: 'both'}} />
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={32}>
                <Col lg={12} md={24}>
                  <Form.Item label="押金">
                    {getFieldDecorator('deposit', {
                      rules: [{ required: true, message: '请输入押金' }],
                    })(
                      <InputNumber placeholder="请输入押金" style={{ width: '100%' }} precision={0} min={0} />
                      )}
                  </Form.Item>
                </Col>
                <Col lg={{ span: 12 }} md={{ span: 24 }}>
                  <Form.Item label="合同周期">
                    {getFieldDecorator('contractPeriod', {
                      rules: [{ required: true, message: '请选择生效日期' }],
                    })(
                      <RangePicker format="YYYY-MM-DD" />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={32}>
                <Col lg={12} md={24}>
                  <Form.Item label="虹宇签约主管">
                    {getFieldDecorator('hyManager', {
                      rules: [{ required: true, message: '请输入虹宇签约主管' }],
                    })(
                      <Input placeholder="请输入虹宇签约主管"  />
                      )}
                  </Form.Item>
                </Col>
                <Col lg={{ span: 12 }} md={{ span: 24 }}>
                  <FormItem label="账户类型">
                    {getFieldDecorator('bankType', {
                      rules: [{ required: true, message: '请输入账户类型' }],
                    })(
                      <Radio.Group>
                        <Radio value={false}>对公账号</Radio>
                        <Radio value={true}>对私账号</Radio>
                      </Radio.Group>
                      )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={32}>
                <Col lg={12} md={24}>
                  <Form.Item label="银行卡号">
                    {getFieldDecorator('bankAccount', {
                      rules: [{ required: true, message: '请输入银行卡号' }],
                    })(
                      <Input placeholder="请输入银行卡号" style={{ width: '210px' }} />
                      )}
                  </Form.Item>
                  <FormItem className={styles.hideMarginBottom}>
                    {getFieldDecorator('type', {
                        initialValue: 'bank',
                      })(<Input  type='hidden' />)
                    }
                  </FormItem>
                </Col>
                <Col lg={{ span: 12 }} md={{ span: 24 }}>
                  <FormItem label="开户人">
                    {getFieldDecorator('accountName', {
                      rules: [{ required: true, message: '开户人为必填项' }],
                    })(<Input placeholder="请输入开户人姓名" style={{ width: '210px' }} />)
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={32}>
                <Col lg={12} md={24}>
                  <Form.Item label="开户行">
                    {getFieldDecorator('bankName', {
                      rules: [{ required: true, message: '请输入开户行名称' }],
                    })(
                      <Input placeholder="请输入开户行名称" />
                      )}
                  </Form.Item>
                </Col>
                <Col lg={{ span: 12 }} md={{ span: 24 }}>
                  <FormItem label="联行号">
                    {getFieldDecorator('bankCode', {
                      rules: [{ required: true, message: '请输入联行号' }],
                    })(
                      <Input placeholder="请输入联行号" />
                      )}
                  </FormItem>
                </Col>
              </Row>
            </Card>
            <Card bordered={false} className={styles.card} title="账号信息">
              <Row gutter={16}>
                <Col lg={8} md={24}>
                  <Form.Item label="账号">
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: '请输入登录账号' }],
                    })(
                      <Input placeholder="请输入登录账号" />
                      )}
                  </Form.Item>
                </Col>
                <Col lg={{ span: 7, offset: 1 }} md={24}>
                  <Form.Item label="角色">
                    {getFieldDecorator('roleId', {
                      rules: [{ required: true, message: '请选择角色' }],
                    })(
                      <Select
                        placeholder="请选择角色"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                        >
                          <Option value="admin">管理员</Option>
                          <Option value="user">普通用户</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={{ span: 7, offset: 1 }} md={24}>
                  <Form.Item label="所属部门">
                    {getFieldDecorator('departmentId', {
                      rules: [{ required: true, message: '请选择是否地接供应商' }],
                    })(
                      <Select
                        placeholder="请选择所属部门"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                        >
                       <Option value="headOffice">总公司</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>      
              <Row gutter={16}>
                <Col lg={8} md={24}>
                  <Form.Item label="负责人">
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: '请输入负责人姓名' }],
                    })(
                      <Input placeholder="请输入负责人姓名" />
                    )}
                 </Form.Item>
                </Col>
                <Col lg={{ span: 7, offset: 1 }} md={24}>
                  <Form.Item label="电话">
                    {getFieldDecorator('mobile', {
                      rules: [{ required: true, message: '请输入联系电话' },{
                        validator: phonevalidator}],
                    })(
                      <Input placeholder="请输入联系电话" />
                      )}
                  </Form.Item>
                </Col>
                <Col lg={{ span: 7, offset: 1 }} md={24}>
                  <Form.Item label="QQ">
                    {getFieldDecorator('qq')(
                      <Input placeholder="请输入QQ号" />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={8} md={24}>
                  <Form.Item label="微信">
                    {getFieldDecorator('wechat')(
                      <Input placeholder="请输入微信号" />
                    )}
                  </Form.Item>
                </Col>
                {/* <Col lg={{ span: 7, offset: 1 }} md={24}>
                  <Form.Item label="微信二维码">
                    {getFieldDecorator('wechatUrl')(
                      <Upload
                        className={styles.uploadInline}
                        name="files"
                        // listType="picture"
                        action="/hyapi/resource/image/upload"
                        onChange={this.handleChange}
                        fileList={this.state.fileList}
                      >
                        <Button>
                          <Icon type="upload" />上传图片
                        </Button>
                      </Upload>
                    )}
                  </Form.Item>
                </Col> */}
              </Row>
            </Card>
          </Form>
        </div>
        <FooterToolbar>
          <Button type="primary" onClick={validate} loading={submitloading}>提交审核</Button >
          <Button onClick={this.returnHandler} style={{ marginLeft: 12 }}>返回</Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ ManageEditModel }) => ({
  datachange:ManageEditModel.datachange,
  loading: ManageEditModel.loading,
}))(Form.create()(ContractEdit))