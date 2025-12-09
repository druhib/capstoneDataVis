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
  originID: number;
  avg_accerlation: number;
  flag: string; 
}

const columns: TableColumnsType<DataType> = [
  { title: 'Advertising Name', dataIndex: 'advertisingName' },
  { title: 'OriginID', dataIndex: 'originID' },
  { title: 'Time  (YY-MM-DD HH:MM:SS) ', dataIndex: 'time' },
  { title: 'Temperature (\u00B0C)  ', dataIndex: 'temp' },
  { title: 'Humidity (%) ', dataIndex: 'humidity' },
  { title: 'Gas (k\u2126)', dataIndex: 'gas' },
  { title: 'Acceleration m/s\u00B2', dataIndex: 'acceleration' },
  { title: 'Avg Acceleration m/s\u00B2', dataIndex: 'avg_accerlation' },
  { title: 'Acceleration Flag', dataIndex: 'flag' },


];




interface ReloadTableProps {
    nodeData: NodeData[];
}


const ReloadTable: React.FC<ReloadTableProps> = ({nodeData}) => {
  console.log("Reload Table Node Data Props: ", nodeData);
  
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
      const accelX2 = data.accelX?.[index-1] ?? 0;
      const accelY2 = data.accelY?.[index-1] ?? 0;
      const accelZ2 = data.accelZ?.[index-1] ?? 0;
      const acceleration = Math.sqrt(accelX ** 2 + accelY ** 2 + accelZ ** 2);
      const acceleration2 = Math.sqrt(accelX2 ** 2 + accelY2 ** 2 + accelZ2 ** 2);
      
      const avg_acceleration_calc = (acceleration2 + acceleration )/2

      return {
        
        advertisingName: node.advertisingName,
        time: node.time,
        temp: data.temp?.[index] ?? 0,
        humidity: data.humidity?.[index] ?? 0,
        gas: data.gas?.[index] ?? 0,
        acceleration: Number(acceleration.toFixed(2)),
        originID: data.originID,
        
        //if acceleration 2 == 0 then print accleration otherwise avg accelaeration 
        avg_accerlation: 
          acceleration2 === 0 
          ? Number(acceleration.toFixed(2)) 
          : Number(avg_acceleration_calc.toFixed(2)),
     
        flag: avg_acceleration_calc >= 20 ? "red" : "green"
        
      };
    });
  });

  

  



  return (
    
    <Flex gap="middle" vertical>
     
      <Table<DataType>  columns={columns} dataSource={dataSource}   size = "large"/>
    </Flex>
  );
};

export default ReloadTable;