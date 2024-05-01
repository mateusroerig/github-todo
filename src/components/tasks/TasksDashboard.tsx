import React from 'react';
import TaskCard from './TasksCard';
import Task from '@/interfaces/Task';

interface TasksDashboardProps {
  tasks: Task[];
}

const TasksDashboard: React.FC<TasksDashboardProps> = ({ tasks }) => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          id={task.id}
          title={task.title} 
          description={task.description} 
          prName={task.prName} 
          prStatus={task.prStatus} 
        />
      ))}
    </div>
  );
};

export default TasksDashboard;