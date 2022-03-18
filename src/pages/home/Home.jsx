import React from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Button, Space, notification } from 'antd';
import { get_all_info } from '../../services/all_services';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import update from 'immutability-helper';
import List from '../../components/List/List';
import { Link } from 'react-router-dom';
import edit from './../../assets/icon/edit-solid.svg';
export default class Home extends React.Component {   
    constructor(props) {
        super(props);
        this.state = {
            type: 'DraggableBodyRow',
            searchText: '',
            searchedColumn: '',
            loading: true,
            data: [],
            columns: [],
            selectedRowKeys: [],
            selectedRows: [],
        };
    }

    componentWillMount() {
        this.get_all_info();
    }


    get_all_info = async () => {
        const res_data = await get_all_info();
        const { data, status, messages } = res_data;
        notification.destroy();
        if(status) {
            messages.map(message => {
                return notification.success({ top: 60, message: message });
            });
            const {headers, rows} = data;
            const dataSource = [];
            await rows.map((row, idx) => {
                row.key = idx;
                row.action = "Update";
                !row.extra_junk_field && dataSource.push(row);
                return row;
            });
            const header_data = headers[0];
            header_data['action'] = {title: 'Action', hidden: false, align: 'center'};
            // console.log({rows, header_data, dataSource});
            const columns = headers.map((header) => {
                const column_headers = [];
                Object.entries(header).map((entry, idx) => {
                    // console.log({entry: entry[0]});
                    let colObj = {
                        title: entry[1].title,
                        dataIndex: entry[0],
                        // defaultSortOrder: 'descend',
                        key: idx,
                        render: (text, record) => {
                            // record?.extra_junk_field && console.log({record});
                            return (
                                <div>
                                    {
                                        entry[1].title === "Action"
                                        ? <Link className='text-decoration-none text-uppercase text-bold brand-color' to={"/get-form?id="+record.id}>
                                            <img height={15} src={edit} alt="Edit" /> 
                                            {/* {text || ""} */}
                                        </Link>
                                        : text || ""
                                    }
                                    
                                </div>
                            )
                        },
                        align: entry[1].title === "Action" ? 'center' : 'left',
                    }

                    entry[1].sortable && entry[0] === "id" 
                    ? (colObj.sorter = (a, b) => a[entry[0]] - b[entry[0]])
                    : entry[1].sortable && entry[0] === "created_at" 
                    ? (colObj.sorter = (a, b) => new Date(a[entry[0]]) - new Date(b[entry[0]]))
                    : entry[1].sortable && (colObj.sorter = (a, b) => a[entry[0]].length - b[entry[0]].length)
                    entry[1].searchable && (colObj={ ...colObj, ...this.getColumnSearchProps(entry[0]) });
                    !entry[1].hidden && column_headers.push(colObj);
                    return colObj;
                });

                return column_headers;
            });
            // console.log({columns, rows, dataSource});
            this.setState({
                columns: columns[0],
                // data: rows,
                data: dataSource,
            }, () => {
                setTimeout(() => {
                    this.setState({loading: false});
                }, 1000);
            });

        }else{
            // console.log({messages});
            notification.error({top: 60, message: messages || 'Something went wrong'});
            setTimeout(() => {
                this.setState({loading: false});
            }, 1000);
        }
    };


    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8, width: "100%" }}>
            <Space>
                <Input
                    showSearch
                    allowClear
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search by ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => {
                        console.log({value: e.target.value});
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                    }}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ margin: 0 }}
                />
                
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ height: 33, margin: 0 }}
                >
                    Search
                </Button>
            </Space>
          
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
    });
    };

    handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
    };

    render() {
        const { loading, data, columns} = this.state;
        return (
            <div>
                {/* <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={record => record.rowKey}
                    loading={loading}
                /> */}
                <List info_data={data} columns={columns} loading={loading} />
            </div>
        );
    }
}

// const Home = () => {
//     const [column, setColumn] = React.useState([]);
//     const [data, setData] = React.useState([]);
//     const [loading, setLoading] = React.useState(false);

//     const loadData = async () => {
//         const res_data = await get_all_info();
//         console.log({res_data});
//         const { data, status, messages } = res_data;
//         notification.destroy();
//         if(status) {
//             // messages.map(message => {
//             //     return notification.success({ notification: "Info Notification",message: message });
//             // });
//             const {headers, rows} = data;
//             rows.map((row) => row.rowKey = row.id);
//             console.log({rows});
//             const columns = headers.map(header => {
//                 const column_headers = [];
//                 const column_data = Object.entries(header).map(entry => {
//                     // console.log({entry});
//                     const colObj = {
//                         title: entry[0],
//                         dataIndex: entry[1].title,
//                         defaultSortOrder: 'descend',
//                         key: entry[1],
//                         render: (text, record) => {
//                             return (
//                                 <div>
//                                     {text}
//                                 </div>
//                             )
//                         },
//                     };
//                     entry[1].sortable && (colObj.sorter = (a, b) => a[entry[1].title] - b[entry[1].title]);
//                     !entry[1].hidden && column_headers.push(colObj);
                    
//                 });
//             })

//         }else{
//             // console.log({messages});
//             notification.error({notification: "Info Notification", message: messages || 'Something went wrong'});
//         }
//     };

//     return (
//         <div>
//             <h1>Hello Table</h1>
//         </div>
//     );
// };

