import React from 'react';
import TaskCard from './TasksCard';
import Task from '@/interfaces/Task';

interface TasksDashboardProps {
  tasks: Task[];
  duplicateTask: (id: number) => void;
}

const TasksDashboard: React.FC<TasksDashboardProps> = ({ tasks, duplicateTask }) => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task}
          duplicateTask={duplicateTask}
        />
      ))}
    </div>
  );
};

export default TasksDashboard;