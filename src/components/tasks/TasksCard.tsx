"use client";

import { Card, Radio, Button, Typography, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Task from '@/interfaces/Task';

const TaskCard: React.FC<Task> = ({ title, description, prName, prStatus }) => {
  const statusColors = {
    open: 'green',
    closed: 'red',
    merged: 'purple'
  };

  return (
    <Card size="small">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Radio />
        <div style={{ flex: 1, marginLeft: '16px' }}>
          <Typography.Title level={5} style={{ margin: 0 }}>{title}</Typography.Title>
          <Typography.Text style={{ margin: 0 }}>{description}</Typography.Text>
        </div>
        <div style={{ marginRight: '8px' }}>
          <Typography.Text>{prName}</Typography.Text>
          <Tag color={statusColors[prStatus]}>{prStatus}</Tag>
        </div>
        <Button type="primary" shape="circle" icon={<CheckCircleOutlined />} />
        <Button type="primary" danger shape="circle" icon={<CloseCircleOutlined />} style={{ marginLeft: '8px' }} />
      </div>
    </Card>
  );
};

export default TaskCard;