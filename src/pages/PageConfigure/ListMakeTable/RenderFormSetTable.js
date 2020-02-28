import React, { PureComponent } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider ,InputNumber} from 'antd';
import styles from './style.less';

export default class RenderFormSetTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }

  getRowByKey(key) {
    return this.state.data.filter(item => item.key === key)[0];
  }
  index = 0;
  cacheOriginData = {};
  toggleEditable(e, key) {
    e.preventDefault();
    const target = this.getRowByKey(key);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: [...this.state.data] });
    }
  }
  remove(key) {
    const newData = this.state.data.filter(item => item.key !== key);
    this.setState({ data: newData });
    this.props.onChange(newData);
  }
  newMember = () => {
    const newData = [...this.state.data];
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      ageStart: '',
      ageEnd: '',
      times: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  }
  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }
  handleInputFieldChange(e, fieldName, key) {
    const newData = [...this.state.data];
    const target = this.getRowByKey(key);
    if (target) {
      target[fieldName] = e;
      this.setState({ data: newData });
    }
  }

  handleSelectFieldChange(e, fieldName, key) {
    const newData = [...this.state.data];
    const target = this.getRowByKey(key);
    if (target) {
      target[fieldName] = e.target.name;
      this.setState({ data: newData });
    }
  }
  saveRow(e, key) {
    e.persist();
    // save field when blur input
    setTimeout(() => {
      if (document.activeElement.tagName === 'INPUT' &&
          document.activeElement !== e.target) {
        return;
      }
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      console.log("target.ageStart",target.ageStart);
      if (!(target.ageStart||target.ageStart===0)||!target.times||!target.ageEnd) {
        message.error('请填写完整保费倍数信息。');
        e.target.focus();
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      this.props.onChange(this.state.data);
    }, 10);
  }
  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const target = this.getRowByKey(key);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: [...this.state.data] });
  }
  render() {
      const {dataSource}=this.props.dataSource;
    const columns =
     [{
      title: '搜索框名称',
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
              placeholder="搜索框名称"     
            />
          );
        }
        return text;
      },
    },
    {
        title: '搜索框字段',
        dataIndex: 'value',
        key: 'value',
        align:'center',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select
                value={text}
                onChange={e => this.handleSelectFieldChange(e, 'value', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="搜索框字段"          
              >
              <Option value="" >输入框</Option>
              <Option value="" >选择器</Option>
              <Option value="" >时间选择框</Option>
              <Option value="" >单选组合框</Option>
              </Select>
            );
          }
          return text;
        },
      },
      {
        title: '搜索框宽度',
        dataIndex: 'width',
        key: 'width',
        align:'center',
        render: (text, record) => {
          if (record.editable) {
            return (
                <InputNumber
                value={text}
                onChange={e => this.handleInputFieldChange(e, 'name', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="搜索框名称"     
              />
            );
          }
          return text;
        },
      },
      {
        title: '搜索框控件',
        dataIndex: 'type',
        key: 'type',
        align:'center',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select
                value={text}
                onChange={e => this.handleSelectFieldChange(e, 'type', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="搜索框控件"
                formatter={value => `${value}倍`}           
              />
            );
          }
          return text;
        },
        },
        {
            title: '搜索框选项',
            dataIndex: 'options',
            key: 'options',
            align:'center',
            render: (text, record) => {
              if (record.editable) {
                return (
                  <Input
                    value={text}
                    onChange={e => this.handleInputFieldChange(e, 'options', record.key)}
                    onKeyPress={e => this.handleKeyPress(e, record.key)}
                    placeholder="以“-”分隔值和名称，以“#”分隔每个选项"          
                  />
                );
              }
              return text;
            },
      },
    {
      title: '操作',
      key: 'action',
      align:'center',
      render: (text, record) => {
        if(this.props.isEdit){
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
      }
      },
    },
  ],

    return (
      <div>
        <Table
          columns={columns}
          bordered
          dataSource={this.state.data}
          pagination={false}
          rowKey={record => record.key}
          rowClassName={(record) => {
            return record.editable ? styles.editable : '';
          }}
        />
        {this.props.isEdit?
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增保费倍数
        </Button>:""}
      </div>
    );
  }
}
