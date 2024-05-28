"use client";

import { Card, Radio, Button, Typography, Badge } from "antd";
import { EditOutlined, CopyOutlined,  } from '@ant-design/icons';
import Task from '@/interfaces/Task';
import PullRequestSection from '@/components/tasks/PullRequestSection'
import { useState } from "react";

const TaskCard: React.FC<Task> = ({ title, description, prName, prStatus }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <Card 
      size="small" 
      hoverable 
      className="hover:shadow-lg" 
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <Radio />
          <div style={{ flex: 1 }}>
            <Typography.Title level={5} style={{ margin: 0 }}>{title}</Typography.Title>
            <Typography.Text style={{ margin: 0 }}>{description}</Typography.Text>
          </div>

          <PullRequestSection name={prName} status={prStatus} />

          <Button type="default" shape="circle" icon={<EditOutlined />} onClick={toggleExpanded} />
          <Button type="default" shape="circle" icon={<CopyOutlined />} />
        </div>

        <div>
          { expanded && (
            <div className="mt-2">
              <Typography.Title level={5}>Teste</Typography.Title>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;