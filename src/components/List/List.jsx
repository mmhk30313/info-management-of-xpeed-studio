import React, { useState, useCallback, useRef, useEffect, Fragment } from 'react';
import { Table, notification, Card, Divider, Alert } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { get_reorder_info_message } from '../../services/all_services';
// const axios = require('axios');
const type = 'DraggableBodyRow';
const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
    const ref = useRef();
    const [{ isOver, dropClassName }, drop] = useDrop({
      accept: type,
      collect: monitor => {
        const { index: dragIndex } = monitor.getItem() || {};
        if (dragIndex === index) {
          return {};
        }
        return {
          isOver: monitor.isOver(),
          dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
        };
      },
      drop: item => {
        moveRow(item.index, index);
      },
    });
    const [, drag] = useDrag({
      type,
      item: { index },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    });
    drop(drag(ref));
  
    return (
      <tr
        ref={ref}
        className={`${className}${isOver ? dropClassName : ''}`}
        style={{ cursor: 'move', ...style }}
        {...restProps}
      />
    );
};

const List = ({info_data, columns, loading}) => {
    const [data, setData] = useState(info_data);
    // console.log({info_data})
    useEffect(() => {
        setData(info_data);
    }, [info_data]);

    const components = {
        body: {
          row: DraggableBodyRow,
        },
    };
    
    const getting_reordering_info_message = async (data) => {
        const res_data = await get_reorder_info_message(data);
        const { data: res_data_data, status, messages } = res_data;
        // console.log({res_data_data});
        notification.destroy();
        if(status && res_data_data) {
            messages.map(message => {
                return notification.success({ notification: "Re-ordering Notification", message: message });
            });
        }else{
          notification.error({ message: "Something wrong to get reorder notification" });;
        }
    }

    const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
          const dragRow = data[dragIndex];
          console.log({dragIndex});
          console.log({dragIndex, dragData: data[dragIndex]});
          getting_reordering_info_message({draggableDataId: dragIndex});
          setData(
            update(data, {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragRow],
              ],
            }),
          );

        },
        [data],
    );

    return (
      <Fragment>
        <Divider>Table List</Divider>
        <Card title={<Alert message="We can sort, search and reorder our table data. After reordering an api will be called by post method but we can't get response." type="success" />}>
          <DndProvider backend={HTML5Backend}>
              <Table
                columns={columns}
                dataSource={data}
                rowKey={record => record.key}
                loading={loading}
                components={components}
                onRow={(record, index) => ({
                    index,
                    moveRow,
                })}
              />
          </DndProvider>
        </Card>
      </Fragment>
    );
};

export default List;