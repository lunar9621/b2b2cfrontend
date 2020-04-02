import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm, Table, message,Select,InputNumber } from 'antd';
import React, { Fragment, Component } from 'react';
import isEqual from 'lodash.isequal';
import styles from './style.less';

class LocaleConfTable extends Component {
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

      if (!target.zhCN || !target.zhTW||!target.enUS||!target.ptBR ) {
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
    const {myLocalName}=this.props;
    console.log("renderlocalConfTablestate",this.state,"props",this.props);
    const columns =
    [{
     title: '词语ID',
     dataIndex: 'ID',
     key: 'ID',
     width:'20%',
     align:'center',
   },
   {
       title: '简体中文',
       dataIndex: 'zhCN',
       key: 'zhCN',
       align:'center',
       render: (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={e => this.handleInputFieldChange(e, 'zhCN', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="填写简体中文"     
            />
          );
        }
        return text;
      },
     },
     {
        title: '繁体中文',
        dataIndex: 'zhTW',
        key: 'zhTW',
        align:'center',
        render: (text, record) => {
            if (record.editable) {
              return (
                <Input
                  value={text}
                  onChange={e => this.handleInputFieldChange(e, 'zhTW', record.key)}
                  onKeyPress={e => this.handleKeyPress(e, record.key)}
                  placeholder="填写繁体中文"     
                />
              );
            }
            return text;
          },
      },
      {
        title: '英文',
        dataIndex: 'enUS',
        key: 'enUS',
        align:'center',
        render: (text, record) => {
            if (record.editable) {
              return (
                <Input
                  value={text}
                  onChange={e => this.handleInputFieldChange(e, 'enUS', record.key)}
                  onKeyPress={e => this.handleKeyPress(e, record.key)}
                  placeholder="填写英文"     
                />
              );
            }
            return text;
        },
      },
      {
        title: '葡萄牙语',
        dataIndex: 'ptBR',
        key: 'ptBR',
        align:'center',
        render: (text, record) => {
            if (record.editable) {
              return (
                <Input
                  value={text}
                  onChange={e => this.handleInputFieldChange(e, 'ptBR', record.key)}
                  onKeyPress={e => this.handleKeyPress(e, record.key)}
                  placeholder="填写葡萄牙语"     
                />
              );
            }
            return text;
        },
      },
      {
        title: myLocalName,
        dataIndex: 'myLocal',
        key: 'myLocal',
        align:'center',
        render: (text, record) => {
          if(myLocalName==""){
             return <span/>
          }else{
            if (record.editable) {
              return (
                <Input
                  value={text}
                  onChange={e => this.handleInputFieldChange(e, 'myLocal', record.key)}
                  onKeyPress={e => this.handleKeyPress(e, record.key)}
                />
              );
            }
            return text;
          }
        }
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
        {/* <Button
          style={{
            width: '100%',
            marginTop: 16,
            marginBottom: 8,
          }}
          type="dashed"
          onClick={this.newMember}
        >
          <PlusOutlined />
          新增描述列表项
        </Button> */}
      </Fragment>
    );
  }
}

export default LocaleConfTable;
