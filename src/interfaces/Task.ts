export default interface Task {
  id: number;
  title: string;
  description?: string;
  priority?: string;
  date?: string;
  order: number;
  completed: boolean;
  pullRequest?: {
    id: number;
    name: string;
    status: 'open' | 'closed' | 'merged';
  }
}