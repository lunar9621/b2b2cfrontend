import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card, Form, Button, Radio, Modal, Tree, message } from 'antd';
import { routerRedux } from 'dva/router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import FooterToolbar from '../../components/FooterToolbar';

const RadioGroup = Radio.Group;
const TreeNode = Tree.TreeNode;
var initSelectedKeys = new Array();
var initSelectedRows = new Array();

function processData(root) {
  const node = root;
  if (node) {
    node.key = node.id;
    if (node.children) {
      if (node.children.length === 0) {
        delete node.children;
      } else {
        node.children.forEach((v) => {
          processData(v);
        });
      }
    }
  }
}

function getInitSelections(root) {
	const node = root;
	if (node) {
		if (node.checked) {
			let tmpNode = node;
			if (tmpNode.children) delete tmpNode.chilren;
			initSelectedRows.push(tmpNode);
			initSelectedKeys.push(tmpNode.id);
		}
		if (node.children) {
			node.children.forEach((v) => {
				getInitSelections(v);
			});
		}
	}
}

function proccessTreeData(root) {
	const node = root;
	if (!node) return;
	node.key = node.id;
	node.title = node.fullName;
	if (node.children) {
		if (node.children.length === 0) {
			delete node.children;
		} else {
			node.children.forEach((v) => {
				proccessTreeData(v);
			});
		}
	}

}

// single root
function modifyTree(root, id, obj) {
	const node = root;
	if (!node) return;
	if (node.id == id) {
		if (!node.checked) {
			node.checked = new Object();
		}
		node.checked.co = obj.co;
		return;
	}
	if (node.children) {
		node.children.forEach((v) => {
			modifyTree(v, id, obj)
		});
	}
}

// single root
function modifyTreeRange(root, id, obj) {
	const node = root;
	if (!node) return;
	if (node.id == id) {
		if (!node.checked) {
			node.checked = new Object();
		}
		node.checked.cr = obj.cr;
		node.checked.departments = obj.departments;
		node.checked.range_checked_list_name = obj.range_checked_list_name;
		return;
	}
	if (node.children) {
		node.children.forEach((v) => {
			modifyTreeRange(v, id, obj)
		});
	}
}

function idTitleMapConstruct(root) {
	if (root) {
		idTitleMap.set(root.id, root.title);
		if (root.children) {
			root.children.forEach((v) => {
				idTitleMapConstruct(v);
			});
		}
	}
}

function checkSubmitData(dataArray) {
	if (dataArray) {
		dataArray.forEach((v) => {
			if (v.children) delete v.children;				//add 180429 address init selection with children property
			if (v.checked) {
				v.co = v.checked.co;
				v.cr = v.checked.cr;
				v.departments = v.checked.departments;
				if (!v.co) v.co = "view";
				if (!v.cr) v.cr = "company";
				// if ( (!v.departments || v.departments.length === 0) && v.cr != 'individual') v.departments = [1];
				//dlete 180429 address init selection with children property
				delete v.checked;
			} else {
				v.co = null;
				v.cr = null;
				v.departments = [];
			}
			delete v.key;
			delete v.name;
			delete v.operation;
			delete v.range;

		});
	}
}

let idTitleMap = null;

class GrantAuth extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			authTree: {
				success: "false",
			    msg: "error",
			    obj: [],
			},
			treeData: {
				success: "false",
			    msg: "error",
			    obj: [],
			},
			visible: false,
			modelCheckedKeys: [],
			modelSelectedKeys: [],
			defaultModelSelectKeys: [],
			defaultModelCheckedKeys: [],
			rowIndex: null,
			rangeType:null,
			selectedRows: null,
			initselectedKeys: null,
			initselectedRows: null,
		};
	}

	back = () => {
		this.props.history.goBack();
		// this.props.dispatch(routerRedux.push('auth-management'));
	}

	componentWillMount() {
		const { dispatch } = this.props;
		console.log("grantAuth",this.props);
		const ID = this.props.location.params.routeParam.ID;
		dispatch({
			type:'ManageEditModel/fetchAuthTree',
			payload: { ID },
			callback: () => {
				initSelectedKeys = new Array();
				initSelectedRows = new Array();
				const { obj } = this.props.authTree;
				if (!obj || obj == 'undefined') return;
		      	obj.forEach((v) => {
		      		processData(v);
		      		getInitSelections(v);
		      	});
		      	this.setState({
		      		authTree:this.props.authTree,
		      		selectedRows: initSelectedRows,
		      		initSelectedKeys: initSelectedKeys,
		      	});
			},
		});
	}

	submit = () => {
		const { dispatch } = this.props;
		const data = new Object();
		data.roleId = this.props.location.query.name;
		data.authorities = this.state.selectedRows;
		checkSubmitData(data.authorities);
		console.log(data);
		dispatch({
			type:'ManageEditModel/submitAuth',
			payload: data,
			callback:() => {
		        const { success, msg } = this.props.datachange;
		        if(success){
					message.success(msg);
					this.props.history.goBack();
		          // dispatch(routerRedux.push('auth-management'));
		        }else{
		          message.error(msg);          
		        }
			},
		})
	}

	handleModelOk = () => {
		const departments = this.state.modelCheckedKeys;
		idTitleMap = new Map();
		this.state.treeData.obj.forEach((v) => {
			idTitleMapConstruct(v);
		});
		const range_names = [];
		if (departments && departments.length != 0) {
			departments.forEach((v) => {
				range_names.push(idTitleMap.get(parseInt(v)));
			});
		}
		console.log(range_names);

		const obj = new Object();
		obj.departments = departments;
		obj.range_checked_list_name = range_names;
		obj.cr = this.state.rangeType;
		let forest = this.state.authTree;
		forest.obj.forEach((v) => {
			modifyTreeRange(v, this.state.rowIndex, obj);
		});
		console.log(this.state);
		this.setState({
			visible: false,
			defaultSelectedKeys: [],
			defaultCheckedKeys: [],
			modelCheckedKeys: [],
			modelSelectedKeys: [],
		});
		idTitleMap = null;
		this.forceUpdate();
	}

	handleModelCancel = () => {
		this.setState({
			visible: false,
			defaultSelectedKeys: [],
			defaultCheckedKeys: [],
			modelCheckedKeys: [],
			modelSelectedKeys: [],
		});
	}

	renderTreeNodes = (data) => {
	    return data.map((item) => {
	      if (item.children) {
	        return (
	          <TreeNode title={item.title} key={item.key} dataRef={item}>
	            {this.renderTreeNodes(item.children)}
	          </TreeNode>
	        );
	      }
	      return <TreeNode {...item} />;
	    });
	 }

	onModelCheck = (checkedKeys, e) => {
		console.log(checkedKeys.checked);
	    this.setState({ 
	    	modelSelectedKeys:checkedKeys.checked,
	    	modelCheckedKeys: checkedKeys.checked,
	    }, () => {
	    	console.log(this.state.modelSelectedKeys);
	    	console.log(this.state.modelCheckedKeys);

	    });
	    
	    
	 }

	onModelSelect = (selectedKeys, info) => {
	    this.setState({ 
	    	modelSelectedKeys:selectedKeys,
	    	modelCheckedKeys: selectedKeys,
	    });
	}

	render() {
		console.log(`selectedRowKeys: ${this.state.selectedRowKeys}`, 'selectedRows: ', this.state.selectedRows);
		const rangeRadio = new Map();
		rangeRadio.set('none', null);
		rangeRadio.set('one', [
			{ label: '公司', value: 'company' },
		]);
		rangeRadio.set('two', [
			{ label: '公司', value: 'company' },
			{ label: '分公司', value: 'subcompany' },
		]);
		rangeRadio.set('three', [
			{ label: '公司', value: 'company' },
			{ label: '分公司', value: 'subcompany' },
			{ label: '部门', value: 'department' },
		]);
		rangeRadio.set('all', [
			{ label: '公司', value: 'company' },
			{ label: '分公司', value: 'subcompany' },
			{ label: '部门', value: 'department' },
			{ label: '个人', value: 'individual' },
		]);

		const operationRadio = new Map();
		operationRadio.set('none', null);
		operationRadio.set('view', [
			{ label: '查看', value: 'view' },
		]);
		operationRadio.set('all', [
			{ label: '查看', value: 'view' },
			{ label: '编辑', value: 'edit' },
		]);
		operationRadio.set('edit', [
			{ label: '编辑', value: 'edit' },
		]);
		
		const handleEdit = (e, id) => {
			let checked = new Object();
			checked.co = new String();
			checked.co = e.target.value;
			let forest = this.state.authTree;
			forest.obj.forEach((v) => {
				modifyTree(v, id, checked);
			});
			this.setState({authTree: forest});
		}

		const handleRange = (e, record) => {
			const { dispatch } = this.props;
			switch(e.target.value) {
				case 'company':
					 {
					let checked = new Object();
					checked.cr = new String();
					checked.cr = e.target.value;
					checked.departments = [1];
					checked.range_checked_list_name = ["河北虹宇国际旅行社有限公司"];
					let forest = this.state.authTree;
					forest.obj.forEach((v) => {
						modifyTreeRange(v, record.id, checked);
					});
					this.setState({authTree: forest});
					console.log(this.state.authTree);
					this.forceUpdate();
					break;
				}
				case 'subcompany':
				{
					dispatch({
						type:'generalsetting/fetchSubCompany',
						callback: () => {
							const { obj } = this.props.treeData;
					      	obj.forEach((v) => {
					      		proccessTreeData(v);
					      	});
					      	this.setState({treeData: this.props.treeData});
						},
					});
					this.setState({
						visible: true,
						rangeType: 'subcompany',
						rowIndex: record.id,
						modelSelectedKeys: [],
						modelCheckedKeys:[],
						defaultCheckedKeys: record.departments,
						defaultSelectedKeys: record.departments,
					});
					break;
				}
				case 'department':
				{
					dispatch({
						type:'generalsetting/fetchDepartment',
						callback: () => {
							const { obj } = this.props.treeData;
					      	obj.forEach((v) => {
					      		proccessTreeData(v);
					      	});
					      	console.log(obj);
					      	this.setState({treeData: this.props.treeData});
						},						
					});
					this.setState({
						visible: true,
						rangeType:'department',
						rowIndex: record.id,
						modelSelectedKeys: [],
						modelCheckedKeys:[],
						defaultCheckedKeys: record.departments,
						defaultSelectedKeys: record.departments,
					});
					break;
				}
				case 'individual':
					// dispatch({
					// 	type:'generalsetting/fetchIndividual',
					// 	callback: () => {
					// 		const { obj } = this.props.treeData;
					//       	obj.forEach((v) => {
					//       		proccessTreeData(v);
					//       	});
					//       	this.setState({treeData: this.props.treeData});
					// 	},
					// });
					// this.setState({
					// 	visible: true,
					// 	rangeType:'individual',
					// 	rowIndex: record.id,
					// 	modelSelectedKeys: [],
					// 	modelCheckedKeys:[],
					// 	defaultCheckedKeys: record.departments,
					// 	defaultSelectedKeys: record.departments,
					// }); 
					{
					let checked = new Object();
					checked.cr = new String();
					checked.cr = e.target.value;
					checked.departments = [];
					checked.range_checked_list_name = ["个人"];
					let forest = this.state.authTree;
					forest.obj.forEach((v) => {
						modifyTreeRange(v, record.id, checked);
					});
					this.setState({authTree: forest});
					console.log(this.state.authTree);
					this.forceUpdate();
					break;
					}
			}
		}

		const columns = [{
			  title: '功能名称',
			  dataIndex: 'name',
			  key: 'name',
			  width: '50%',
			}, 
			// {
			// 	title:'权限范围',
			// 	children: [
			// 		{
			// 		  title: '范围',
			// 		  dataIndex: 'range',
			// 		  key: 'range',
			// 		  width: '30%',
			// 		  render: function(text, record, index) {
			// 		  	if (record.checked) {
			// 		  		return (
			// 					<div>
			// 			  			<RadioGroup 
			// 			  				options={ rangeRadio.get(record.range) } 
			// 			  				defaultValue={ record.checked.cr }
			// 			  				onChange={ (e) => {
			// 			  					handleRange(e, record);
			// 			  				} }
			// 			  			/>
			// 			  		</div>
			// 		  		);
			// 		  	}
			// 			return (
			// 			 	<div>
			// 			  		<RadioGroup 
			// 			  			options={ rangeRadio.get(record.range) } 
			// 			  			onChange={ (e) => {
			// 			  				handleRange(e, record);
			// 			  			} }
			// 			  		/>
			// 			  	</div>
			// 			);
			// 			},
			// 		},
			// 		{
			// 		  title: '范围值',
			// 		  width: '20%',
			// 		  key: 'description',
			// 		  render: function(text, record, index) {
			// 		  	if (record.checked) {
			// 		  		return (
			// 		  		<div>{ record.checked.range_checked_list_name ? record.checked.range_checked_list_name.toString() : null}</div>
			// 		  	);
			// 		  	}
			// 		  	return null;
			// 		  },
			// 		},
			// 	],
			// },
			 {
			  title: '编辑与查看',
			  dataIndex: 'operation',
			  width: '40%',
			  key: 'operation',
			  render: function(text, record, index) { 
			  	if (record.checked) return (
			  		<div>
			  			<RadioGroup 
				  			options={ operationRadio.get(record.operation) }
				  			defaultValue={ record.checked.co }
				  			onChange={ (e) => {
				  				handleEdit(e, record.id);
				  			} }
			  			/>
			  		</div>
			  	);
			  	return (
			  	<div>
			  		<RadioGroup 
			  			options={ operationRadio.get(record.operation) }
			  			onChange={ (e) => {
			  				handleEdit(e, record.id);
			  			} }
			  		/>
			  	</div>
			  );
			},
		}];

		// rowSelection object indicates the need for row selection
		const rowSelection = {
		  selectedRowKeys: this.state.initSelectedKeys,
		  onChange: (selectedRowKeys, selectedRows) => {
		  	this.setState({initSelectedKeys: selectedRowKeys});
		  	this.setState({ selectedRows });
		    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		  },
		  getCheckboxProps: record => ({
		    disabled: record.name === 'Disabled User', // Column configuration not to be checked
		  }),
		};

		return(
		<PageHeaderWrapper>
				<Card bordered={ false } style={{ 'marginBottom': 50  }} >
					<Table 
					 	columns={ columns } 
					 	rowKey={record => record.id}
					 	dataSource={this.state.authTree.obj}
					 	rowSelection={rowSelection}
					 	bordered
					 	defaultExpandAllRows={true}
					 	pagination={false}
					 	loading={this.props.loading}
					/>
					<Modal title="请选择..."
			          visible={this.state.visible}
			          onOk={this.handleModelOk}
			          onCancel={this.handleModelCancel}
			        >
			        	<Tree
					        checkable
					        multiple
					        defaultExpandAll
					        checkStrictly
					        onCheck={this.onModelCheck}
					        defaultSelectedKeys={this.state.defaultModelSelectKeys}
        					defaultCheckedKeys={this.state.defaultModelCheckedKeys}
					        checkedKeys={this.state.modelCheckedKeys}
					        onSelect={this.onModelSelect}
        					selectedKeys={this.state.modelSelectedKeys}
				      	>
				        {this.renderTreeNodes(this.state.treeData.obj)}
				      </Tree>
			        </Modal>
				</Card>

				<FooterToolbar>
	          <Button 
	          	type="primary" 
	          	onClick={ this.submit }  
	          	// loading={ authSubmitting } 
	          >
	          	提交
	          </Button>
	          <Button 
	          	// type="primary" 
	          	onClick={this.back}
	          >
	          	返回
	          </Button>
	        </FooterToolbar>
        </PageHeaderWrapper>
		);
	}
}

export default connect(({ ManageEditModel }) => ({
    dataEdit: ManageEditModel.dataEdit.obj,//详情页数据源
	datachange:ManageEditModel.datachange,
	authTree: ManageEditModel.authTree,
    loading: ManageEditModel.loading,
}))(Form.create()(GrantAuth))