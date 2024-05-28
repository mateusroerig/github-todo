"use client";

import { Card, Radio, Button, Typography, Badge } from "antd";
import { EditOutlined, CopyOutlined,  } from '@ant-design/icons';
import Task from '@/interfaces/Task';
import PullRequestSection from '@/components/tasks/PullRequestSection'
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  duplicateTask: (id: number) => any;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, duplicateTask }) => {
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
            <Typography.Title level={5} style={{ margin: 0 }}>{task.title}</Typography.Title>
            <Typography.Text style={{ margin: 0 }}>{task.description}</Typography.Text>
          </div>

          <PullRequestSection name={task.prName} status={task.prStatus} />

          <Button type="default" shape="circle" icon={<EditOutlined />} onClick={toggleExpanded} />
          <Button type="default" shape="circle" icon={<CopyOutlined />} onClick={() => duplicateTask(task.id)} />
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