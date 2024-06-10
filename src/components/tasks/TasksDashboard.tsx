import React from 'react';
import TaskCard from './TasksCard';
import Task from '@/interfaces/Task';

interface TasksDashboardProps {
  tasks: Task[];
  updateTask: (task: Task) => void;
  duplicateTask: (id: number) => void;
}

const TasksDashboard: React.FC<TasksDashboardProps> = ({ tasks, duplicateTask, updateTask }) => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task}
          updateTask={updateTask}
          duplicateTask={duplicateTask}
        />
      ))}
    </div>
  );
};

export default TasksDashboard;