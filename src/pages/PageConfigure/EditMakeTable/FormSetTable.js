import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm, Table, message,Select,InputNumber } from 'antd';
import React, { Fragment, Component } from 'react';
import isEqual from 'lodash.isequal';
import styles from '../style.less';

class FormSetTable extends Component {
  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }

    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  clickedCancel = false;

  index = 0;

  cacheOriginData = {};
 

  constructor(props) {
    super(props);
    this.state = {
      data: props.value,
      loading: false,
      value: props.value,
    };
  }

  getRowByKey(key, newData) {
    const { data = [] } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data = [] } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);

    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }

      target.editable = !target.editable;
      this.setState({
        data: newData,
      });
    }
  };

  newMember = () => {
    const { data = [] } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      name: '',
      field: '',
      isRequired:'',
      disabled:'',
      defaultValue:'',
      component: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({
      data: newData,
    });
  };

  remove(key) {
    const { data = [] } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({
      data: newData,
    });

    if (onChange) {
      onChange(newData);
    }
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleInputFieldChange(e, fieldName, key) {
    const { data = [] } = this.state;
    const newData = [...data];
    const target = this.getRowByKey(key, newData);

    if (target) {
      console.log("inputevent",e);
      target[fieldName] = e.target.value;
      this.setState({
        data: newData,
      });
    }
  }

  handleSelectFieldChange(e, fieldName, key) {
    const { data = [] } = this.state;
    const newData = [...data];
    const target = this.getRowByKey(key, newData);

    if (target) {
      console.log("selectevent",e);
      target[fieldName] = e;
      this.setState({
        data: newData,
      });
    }
  }

  handleInputNumberFieldChange(e, fieldName, key) {
    const { data = [] } = this.state;
    const newData = [...data];
    const target = this.getRowByKey(key, newData);

    if (target) {
      console.log("inputnumberevent",e);
      target[fieldName] = e;
      this.setState({
        data: newData,
      });
    }
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }

      const target = this.getRowByKey(key) || {};

      if (!target.name || !target.field || !target.isRequired|| !target.defaultValue|| !target.component ) {
        message.error('请填写完整成员信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }

      delete target.isNew;
      this.toggleEditable(e, key);
      const { data = [] } = this.state;
      const { onChange } = this.props;
console.log("-------------onchange",onChange);
      if (onChange) {
        onChange(data);
      }

      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data = [] } = this.state;
    const newData = [...data]; // 编辑前的原始数据

    let cacheOriginData = [];
    cacheOriginData = newData.map(item => {
      if (item.key === key) {
        if (this.cacheOriginData[key]) {
          const originItem = { ...item, ...this.cacheOriginData[key], editable: false };
          delete this.cacheOriginData[key];
          return originItem;
        }
      }

      return item;
    });
    this.setState({
      data: cacheOriginData,
    });
    this.clickedCancel = false;
  }

  render() {
    const { loading, data } = this.state;
    const {fieldValue}=this.props;
    const fieldOptions=fieldValue.map((item, index) => <Option value={item.name}>{item.name}</Option>);
    const columns =
    [{
     title: '列表项名称',
     dataIndex: 'name',
     key: 'name',
     align:'center',
     render: (text, record) => {
       if (record.editable) {
         return (
           <Input
             value={text}
             onChange={e => this.handleInputFieldChange(e, 'name', record.key)}
             onKeyPress={e => this.handleKeyPress(e, record.key)}
             placeholder="列表项名称"     
           />
         );
       }
       return text;
     },
   },
   {
       title: '列表项字段',
       dataIndex: 'field',
       key: 'field',
       align:'center',
       render: (text, record) => {
         if (record.editable) {
           return (
             <Select
               value={text}
               onChange={e => this.handleSelectFieldChange(e, 'field', record.key)}
               onKeyPress={e => this.handleKeyPress(e, record.key)}
               placeholder="列表项字段"          
             >
             {fieldOptions}
             </Select>
           );
         }
         return text;
       },
     },
     {
      title: '是否必填',
      dataIndex: 'isRequired',
      key: 'isRequired',
      align:'center',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Select
              value={text}
              onChange={e => this.handleSelectFieldChange(e, 'isRequired', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="是否必填"          
            >
            <Option value="是">是</Option>
            <Option value="否">否</Option>
            </Select>
          );
        }
        return text;
      },
    },
  
    {
      title: '字段默认值',
      dataIndex: 'defaultValue',
      key: 'defaultValue',
      align:'center',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={e => this.handleInputFieldChange(e, 'defaultValue', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="字段默认值"     
            />
          );
        }
        return text;
      },
    },
    {
      title: '控件类型',
      dataIndex: 'component',
      key: 'component',
      align:'center',
      render: (text, record) => {
        if (record.editable) {
          return (
            <Select
              value={text}
              onChange={e => this.handleSelectFieldChange(e, 'component', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="搜索框控件"          
            > 
              <Option value="Input">Input</Option>
              <Option value="TextArea">TextArea</Option>
               <Option value="InputNumber">InputNumber</Option>
               <Option value="Select">Select</Option>
               <Option value="Switch">Switch</Option>
               <Option value="DatePicker">DatePicker</Option>
               <Option value="TimePicker">TimePicker</Option>
               <Option value="BraftEditor">BraftEditor</Option>
               <Option value="Radio">Radio</Option>
               <Option value="CheckBox">CheckBox</Option>
               <Option value="Upload">Upload</Option>
            </Select>
          );
        }
        return text;
       },
      },
      {
          title: '选项',
          dataIndex: 'options',
          key: 'options',
          align:'center',
          render: (text, record) => {
            if (record.editable) {
             if( record.type==="Select"||record.type==="Radio"||record.type==="CheckBox")
                return(
                <Input
                  value={text}
                  onChange={e => this.handleInputFieldChange(e, 'options', record.key)}
                  onKeyPress={e => this.handleKeyPress(e, record.key)}
                  placeholder="以“-”分隔值和名称，以“#”分隔每个选项"          
                />)
                else{
                return (<div/>)
                }
            }
            return text;
          },
      },
      {
        title: '是否可编辑',
        dataIndex: 'disabled',
        key: 'disabled',
        align:'center',
        render: (text, record) => {
          if (record.editable) {
            if( record.type==="Input"||record.type==="InpuNumber"||record.type==="Select"){
            return (
              <Select
                value={text}
                onChange={e => this.handleSelectFieldChange(e, 'disabled', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
              >
              <Option value="是">是</Option>
              <Option value="否">否</Option>
              </Select>
            );
            }else{
              return (<div/>)
            }
          }
          return text;
        },
      },
   {
     title: '操作',
     key: 'action',
     align:'center',
     render: (text, record) => {
       if (record.editable) {
         if (record.isNew) {
           return (
             <span>
               <a onClick={e => this.saveRow(e, record.key)}>保存</a>
               <Divider type="vertical" />
               <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                 <a>删除</a>
               </Popconfirm>
             </span>
           );
         }
         return (
           <span>
             <a onClick={e => this.saveRow(e, record.key)}>保存</a>
             <Divider type="vertical" />
             <a onClick={e => this.cancel(e, record.key)}>取消</a>
           </span>
         );
       }
       return (
         <span>
           <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
           <Divider type="vertical" />
           <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
             <a>删除</a>
           </Popconfirm>
         </span>
       );
     },
   },];
    console.log("rendertable",this.props);
    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
        <Button
          style={{
            width: '100%',
            marginTop: 16,
            marginBottom: 8,
          }}
          type="dashed"
          onClick={this.newMember}
        >
          <PlusOutlined />
          新增表单项
        </Button>
      </Fragment>
    );
  }
}

export default FormSetTable;
