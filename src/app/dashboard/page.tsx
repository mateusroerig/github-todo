"use client";

import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { Empty, FloatButton, Button } from "antd";
import TasksDashboard from '@/components/tasks/TasksDashboard';
import Task from '@/interfaces/Task';
import { useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Criar a página de login',
      description: 'Criar a página de login com a autenticação do Github.',
      prName: 'login-page',
      prStatus: 'open'
    },
    {
      id: 2,
      title: 'Criar a página de configurações',
      description: 'Criar a página de configurações do usuário.',
      prName: 'config-page',
      prStatus: 'closed'
    },
    {
      id: 3,
      title: 'Criar a página de dashboard',
      description: 'Criar a página de dashboard do usuário.',
      prName: 'dashboard-page',
      prStatus: 'merged'
    }
  ]);

  const duplicateTask = (id: number) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      const maxId = Math.max(...tasks.map(task => task.id));
      const newTask = { ...task, id: maxId + 1, title: `${task.title} (cópia)` };
      setTasks([...tasks, newTask]);
    }
  }

  return (
    <div className="flex flex-col items-center h-[calc(100vh-64px)] w-full p-5">
      <div className="flex mb-5 items-center justify-between w-full">
        <h1>Dashboard</h1>
        <div>
          <Button type="primary" icon={<PlusOutlined />}>
            Criar
          </Button>
          <Button style={{ marginLeft: '10px' }} icon={<DownOutlined />} iconPosition="end">
            Filtrar
          </Button>
        </div>
      </div>

      {tasks.length > 0 ? (
        <TasksDashboard tasks={tasks} duplicateTask={duplicateTask}/>
      ) : (
        <>
          <Empty description="Nenhuma tarefa no momento"/>
          <FloatButton type="primary" icon={<PlusOutlined />} />
        </>
      )}
    </div>
  );
}