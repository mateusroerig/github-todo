"use client";

import { Card, Radio, Button, Typography, Badge, Divider, Tag, Input, Select, DatePicker } from "antd";
import { EditOutlined, CopyOutlined,  } from '@ant-design/icons';
import Task from '@/interfaces/Task';
import PullRequestSection from '@/components/tasks/PullRequestSection'
import { useState } from "react";
import dayjs from 'dayjs';

import './tasks.css';

interface TaskCardProps {
  task: Task;
  duplicateTask: (id: number) => any;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, duplicateTask }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  const priorityOptions = [
    { value: 'none', label: 'Nenhuma'},
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
    { value: 'urgent', label: 'Urgente'}
  ];

  const prOptions = [
    { value: 'login-page', label: 'login-page' },
    { value: 'config-page', label: 'config-page' },
    { value: 'dashboard-page', label: 'dashboard-page' },
  ];

  const handleSearch = (value: string) => {
    console.log('search:', value);
  }


  return (
    <Card 
      size="small" 
      hoverable 
      className="hover:shadow-lg" 
    >
      <div>
        <div className="task-content">
          <Radio />
          <div style={{ flex: 1 }}>
            <Typography.Title level={5} style={{ margin: 0 }}>{task.title}</Typography.Title>
            { (!expanded || !task.description) && <Typography.Text style={{ margin: 0 }}>{task.description}</Typography.Text>}
          </div>

          { !expanded && 
            <>
              { task.pullRequest && <PullRequestSection name={task.pullRequest.name} status={task.pullRequest.status} />}
              <Button type="default" shape="circle" icon={<EditOutlined />} onClick={toggleExpanded} />
              <Button type="default" shape="circle" icon={<CopyOutlined />} onClick={() => duplicateTask(task.id)} />
            </>
          }
        </div>

        <div>
          { expanded && 
            <div className="pt-2 w-full flex flex-col gap-4">
              <Input.TextArea placeholder="Descrição" defaultValue={task.description}/>

              <div className="flex flex-col gap-4" >
                <div className="flex gap-2 justify-end">
                  <Select
                    className="w-full"
                    showSearch
                    defaultValue={task.pullRequest?.name}
                    placeholder="Vincular Pull Request"
                    defaultActiveFirstOption={false}
                    suffixIcon={null}
                    filterOption={false}
                    onSearch={handleSearch}
                    options={prOptions}
                  />

                  <DatePicker 
                    style={{ minWidth: 120 }}
                    defaultValue={dayjs('01/01/2015')} 
                    format={'DD/MM/YYYY'} 
                  />

                  <Select
                    placeholder="Prioridade"
                    style={{ minWidth: 120 }}
                    popupMatchSelectWidth={false}
                    defaultValue="none"
                    options={priorityOptions}
                  />
                  <Button type="primary" onClick={toggleExpanded}>Fechar</Button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;