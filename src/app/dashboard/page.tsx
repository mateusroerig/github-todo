"use client";

import { useState, useEffect } from "react";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { Empty, Button } from "antd";

import TasksDashboard from "@/components/tasks/TasksDashboard";
import TasksCreateDialog from "@/components/tasks/TasksCreateDialog";

import { Task } from "@prisma/client";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const tasks = await axios.get("/api/task").then((res) => res.data);
      setTasks(tasks);
    })();
  }, []);

  const duplicateTask = async (id: number) => {
    const task = tasks.find((task) => task.id === id);

    if (!task) return;

    const newTask = await axios.post("/api/task", {...task, id: undefined}).then((res) => res.data);
    setTasks([...tasks, newTask]);
  };

  const updateTask = async (task: Task) => {
    const updatedTask = await axios.put("/api/task", task).then((res) => res.data);
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const deleteTask = async (id: number) => {
    await await axios.delete("/api/task/" + id).then((res) => res.data);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const openCreateDialog = () => {
    setIsModalVisible(true);
  };

  const handleCreate = (task: Task) => {
    setIsModalVisible(false);
    setTasks([...tasks, task]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
          <Button
            style={{ marginLeft: "10px" }}
            icon={<DownOutlined />}
            iconPosition="end"
          >
            Filtrar
          </Button>
        </div>
      </div>

      <TasksCreateDialog
        open={isModalVisible}
        onCreate={handleCreate}
        onCancel={handleCancel}
      />

      {tasks.length > 0 ? (
        <TasksDashboard
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
          duplicateTask={duplicateTask}
        />
      ) : (
        <Empty description="Nenhuma tarefa no momento" />
      )}
    </div>
  );
}
