import React, { useState } from 'react';

import { Button, Flex, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

// type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface NodeData {
    id: string;
    latitude: number; 
    longitude: number; 
    UUID: string;
    advertisingName: string;
    data: {
        temp: number[],
        humidity: number[],
        gas: number[],
        accelX: number[],
        accelY: number[],
        accelZ: number[],
        
    };

}

interface DataType {
  time: number;
  temp: number;
  humidity: number;
  gas: number;
  acceleration: number;
}

const columns: TableColumnsType<DataType> = [
  { title: 'Time', dataIndex: 'time' },
  { title: 'Temperature  ', dataIndex: 'temp' },
  { title: 'Humidity', dataIndex: 'humidity' },
  { title: 'Gas', dataIndex: 'gas' },
  { title: 'Acceleration', dataIndex: 'acceleration' },
];

// const dataSource = nodeData.map( => ({
//   time: 0,
//   temp: 10,
//   humidity: 32,
//   gas: 12,
//   acceleration: 10,
// }));



interface ReloadTableProps {
    nodeData: NodeData[];
}


const ReloadTable: React.FC<ReloadTableProps> = ({nodeData}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  console.log("Reload Table Node Data: ", nodeData);

   // Map nodeData to create rows for all data points across all nodes
  const dataSource: DataType[] = nodeData.flatMap((node: NodeData) => {
    const data = node?.data || {};
    
   // all lengths of data arrays should be the same
    const maxLength = data.temp?.length;

    // Create a row for each time point in this node's data
    return Array.from({ length: maxLength }, (_, index): DataType => {
      const accelX = data.accelX?.[index] ?? 0;
      const accelY = data.accelY?.[index] ?? 0;
      const accelZ = data.accelZ?.[index] ?? 0;
      const acceleration = Math.sqrt(accelX ** 2 + accelY ** 2 + accelZ ** 2);

      return {
        // key: `${node.id}-${index}`, // Unique key for each row
        time: index,
        temp: data.temp?.[index] ?? 0,
        humidity: data.humidity?.[index] ?? 0,
        gas: data.gas?.[index] ?? 0,
        acceleration: Number(acceleration.toFixed(2)),
        // nodeName: node.advertisingName, // Include node identifier
      };
    });
  });

  

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

 
  // const rowSelection: TableRowSelection<DataType> = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" onClick={start}  loading={loading}>
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table<DataType>  columns={columns} dataSource={dataSource} size = 'small' />
    </Flex>
  );
};

export default ReloadTable;