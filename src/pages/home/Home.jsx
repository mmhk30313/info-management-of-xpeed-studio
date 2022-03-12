import React from 'react';
import { Table, Button, Divider, Select, message, notification, Card, Row, Col, Skeleton, Popconfirm } from 'antd';
import { get_all_info } from '../../services/all_services';
const axios = require('axios');
const Home = () => {
    const [column, setColumn] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const loadData = async () => {
        setLoading(true);
        const res_data = await get_all_info();
        console.log({res_data});
        const { data, status, messages } = res_data;
        notification.destroy();
        if(status) {
            // messages.map(message => {
            //     return notification.success({ notification: "Info Notification",message: message });
            // });
            const {headers, rows} = data;
            rows.map((row) => row.rowKey = row.id);
            console.log({rows});
            const columns = headers.map(header => {
                const column_headers = [];
                const column_data = Object.entries(header).map(entry => {
                    // console.log({entry});
                    const colObj = {
                        title: entry[0],
                        dataIndex: entry[1].title,
                        defaultSortOrder: 'descend',
                        key: entry[1],
                        render: (text, record) => {
                            return (
                                <div>
                                    {text}
                                </div>
                            )
                        },
                    };
                    entry[1].sortable && (colObj.sorter = (a, b) => a[entry[1].title] - b[entry[1].title]);
                    !entry[1].hidden && column_headers.push(colObj);
                    
                });
            })

        }else{
            // console.log({messages});
            notification.error({notification: "Info Notification", message: messages || 'Something went wrong'});
        }
    };

    React.useEffect(() => {
        loadData();
    }, [""]);

    return (
        <div>
            <h1>Hello Table</h1>
        </div>
    );
};

export default Home;