import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { Empty, FloatButton, Button } from "antd";
import TasksDashboard from '@/components/tasks/TasksDashboard';
import Task from '@/interfaces/Task';

const tasks: Task[] = [
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
];

export default function Dashboard() {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)] w-full p-5">
      <div className="flex mb-2 items-center justify-between w-full">
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
        <TasksDashboard tasks={tasks}/>
      ) : (
        <>
          <Empty description="Nenhuma tarefa no momento"/>
          <FloatButton type="primary" icon={<PlusOutlined />} />
        </>
      )}
    </div>
  );
}