"use client";

import { Card, Radio, Button, Typography, Badge } from "antd";
import { EditOutlined, CopyOutlined,  } from '@ant-design/icons';
import Task from '@/interfaces/Task';
import PullRequestSection from '@/components/tasks/PullRequestSection'

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

        <PullRequestSection name={prName} status={prStatus} />

        <Button type="default" shape="circle" icon={<EditOutlined />} />
        <Button type="default" shape="circle" icon={<CopyOutlined />} />
      </div>
    </Card>
  );
};

export default TaskCard;