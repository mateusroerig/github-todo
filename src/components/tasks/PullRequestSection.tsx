import {  Typography } from "antd";

interface PullRequestsSeccionProps {
  name: string;
  status: 'open' | 'closed' | 'merged';
}

const PullRequestSection = ({ name, status }: PullRequestsSeccionProps) => {
  const statusColors = {
    open: 'green',
    closed: 'red',
    merged: 'purple'
  };

  return (
    <div 
      className="p-1 gap-0.5 min-w-[120px] rounded-md flex items-center cursor-pointer"
      style={{ border: '1px solid #303030' }}
    >
      <div 
        className="rounded-full w-3 h-3 m-2" 
        style={{ backgroundColor: statusColors[status] }}
      ></div>
      
      <div 
        className="flex flex-col flex-1 items-start mr-4"
      >
        <Typography.Text strong style={{ lineHeight: '1.3' }}>{name}</Typography.Text>
        <Typography.Text type="secondary"  style={{ lineHeight: '1.3' }}>{status}</Typography.Text>
      </div>
    </div>
  );
}

export default PullRequestSection;