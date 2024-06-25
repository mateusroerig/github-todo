"use client";

import { useState, useEffect, useCallback } from "react";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { Empty, Button } from "antd";

import TasksDashboard from "@/components/tasks/TasksDashboard";
import TasksCreateDialog from "@/components/tasks/TasksCreateDialog";
import FilterDropdownButton, { FilterValues } from "@/components/FilterDropdownButton";

import { Task } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useLoading } from "@/components/Loading/LoadingContexts";

export default function Dashboard() {
  const session = useSession();
  const { startLoading, stopLoading } = useLoading();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchTasks = useCallback(async (filters: FilterValues = {}) => {
    
    const userId = session.data?.user?.id
    if (!userId) return;
    
    const fetchedTasks = await axios
      .get("/api/task", { params: { userId, ...filters } })
      .then((res) => res.data);
  
    setTasks(fetchedTasks);
  }, [session, setTasks]);

  useEffect(() => {
    (async () => {
      await fetchTasks();
    })();
  }, [fetchTasks, session]); // Add session as a dependency if fetchTasks should run on session change

  const applyFiltering = async (filters: any) => {
    startLoading();
    await fetchTasks(filters);
    stopLoading();
  };

  const duplicateTask = async (id: number) => {
    startLoading();

    const task = tasks.find((task) => task.id === id);
    if (!task) {
      stopLoading();
      return;
    }

    const newTask = await axios
      .post("/api/task", { 
        ...task, 
        id: undefined,
        title: task.title + " (Cópia)",
      })
      .then((res) => res.data);

    setTasks([...tasks, newTask]);
    stopLoading();
  };

  const updateTask = async (task: Task) => {
    startLoading();
    const updatedTask = await axios
      .put("/api/task", task)
      .then((res) => res.data);

    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    stopLoading();
  };

  const deleteTask = async (id: number) => {
    startLoading();
    await await axios.delete("/api/task/" + id).then((res) => res.data);
    setTasks(tasks.filter((task) => task.id !== id));
    stopLoading();
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
        <div className="flex gap-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateDialog}
          >
            Criar
          </Button>

          <FilterDropdownButton applyFiltering={applyFiltering} />
          
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
