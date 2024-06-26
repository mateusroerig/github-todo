import React from "react";
import TaskCard from "./TasksCard";
import { Task } from "@prisma/client";

interface TasksDashboardProps {
  tasks: Task[];
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  duplicateTask: (id: number) => void;
}

const TasksDashboard: React.FC<TasksDashboardProps> = ({
  tasks,
  duplicateTask,
  deleteTask,
  updateTask,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
          duplicateTask={duplicateTask}
        />
      ))}
    </div>
  );
};

export default TasksDashboard;
