export default interface Task {
  id: number;
  title: string;
  description: string;
  prName: string;
  prStatus: 'open' | 'closed' | 'merged';
}