"use client";

import { useState, useEffect } from "react";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { Empty, FloatButton, Button } from "antd";
import TasksDashboard from '@/components/tasks/TasksDashboard';
import TasksCreateDialog from "@/components/tasks/TasksCreateDialog";
import { tasksService } from '@/services/tasks.service';
import Task from '@/interfaces/Task';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const tasks = tasksService.find() || [];
    setTasks(tasks);
  }, []);

  const duplicateTask = (id: number) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      tasksService.create({ ...task, id: tasks.length + 1 });
      setTasks(tasksService.find());
    }
  }

  const updateTask = (task: Task) => {
    tasksService.update(task);
    setTasks(tasksService.find());
  }

  const openCreateDialog = () => {
    setIsModalVisible(true);
  }
  
  const handleCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setIsModalVisible(false);
    setTasks(tasksService.find());
  }
  
  const handleCancel = () => {
    setIsModalVisible(false);
  }

  return (
    <div className="flex flex-col items-center h-[calc(100vh-64px)] w-full p-5">
      <div className="flex mb-5 items-center justify-between w-full">
        <h1>Dashboard</h1>
        <div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={openCreateDialog}
          >
            Criar
          </Button>
          <Button style={{ marginLeft: '10px' }} icon={<DownOutlined />} iconPosition="end">
            Filtrar
          </Button>
        </div>
      </div>

      <TasksCreateDialog open={isModalVisible} onCreate={handleCreate} onCancel={handleCancel} />

      {tasks.length > 0 ? (
        <TasksDashboard 
          tasks={tasks} 
          updateTask={updateTask}
          duplicateTask={duplicateTask}
        />
      ) : (
        <>
          <Empty description="Nenhuma tarefa no momento"/>
          <FloatButton type="primary" icon={<PlusOutlined />} />
        </>
      )}
    </div>
  );
}