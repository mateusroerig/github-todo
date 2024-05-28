"use client";

import { Card, Radio, Button, Typography, Badge } from "antd";
import { EditOutlined, CopyOutlined,  } from '@ant-design/icons';
import Task from '@/interfaces/Task';

const TaskCard: React.FC<Task> = ({ title, description, prName, prStatus }) => {
  const statusColors = {
    open: 'green',
    closed: 'red',
    merged: 'purple'
  };

  return (
    <Card size="small">
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        <Radio />
        <div style={{ flex: 1 }}>
          <Typography.Title level={5} style={{ margin: 0 }}>{title}</Typography.Title>
          <Typography.Text style={{ margin: 0 }}>{description}</Typography.Text>
        </div>

        <div 
          className="p-1 gap-0.5 min-w-[120px] rounded-md flex items-center cursor-pointer"
          style={{ border: '1px solid #303030' }}
        >
          <div 
            className="rounded-full w-3 h-3 m-2" 
            style={{ backgroundColor: statusColors[prStatus] }}
          ></div>
          
          <div 
            className="flex flex-col flex-1 items-start mr-4"
          >
            <Typography.Text strong style={{ lineHeight: '1.3' }}>{prName}</Typography.Text>
            <Typography.Text type="secondary"  style={{ lineHeight: '1.3' }}>{prStatus}</Typography.Text>
          </div>
        </div>

        <Button type="default" shape="circle" icon={<EditOutlined />} />
        <Button type="default" shape="circle" icon={<CopyOutlined />} />
      </div>
    </Card>
  );
};

export default TaskCard;