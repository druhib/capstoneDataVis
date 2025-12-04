import React, { useState } from 'react';

import { Button, Flex, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import {NodeData} from './types'


interface DataType {
  advertisingName: string;
  time: string;
  temp: number;
  humidity: number;
  gas: number;
  acceleration: number;
}

const columns: TableColumnsType<DataType> = [
  { title: 'Advertising Name', dataIndex: 'advertisingName' },
  { title: 'Time  (YY-MM-DD HH:MM:SS) ', dataIndex: 'time' },
  { title: 'Temperature (\u00B0C)  ', dataIndex: 'temp' },
  { title: 'Humidity (%) ', dataIndex: 'humidity' },
  { title: 'Gas (k\u2126)', dataIndex: 'gas' },
  { title: 'Acceleration m/s\u00B2', dataIndex: 'acceleration' },
];




interface ReloadTableProps {
    nodeData: NodeData[];
}


const ReloadTable: React.FC<ReloadTableProps> = ({nodeData}) => {
  console.log("Reload Table Node Data Props: ", nodeData);
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
        
        advertisingName: node.advertisingName,
        time: node.time,
        temp: data.temp?.[index] ?? 0,
        humidity: data.humidity?.[index] ?? 0,
        gas: data.gas?.[index] ?? 0,
        acceleration: Number(acceleration.toFixed(2)),
        
      };
    });
  });

  

  

  const hasSelected = selectedRowKeys.length > 0;

  return (
    
    <Flex gap="middle" vertical>
      {/* <Flex align="center" gap="middle">
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex> */}
      <Table<DataType>  columns={columns} dataSource={dataSource}   size = "large"/>
    </Flex>
  );
};

export default ReloadTable;