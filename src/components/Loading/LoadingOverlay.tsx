import React from 'react';
import { Spin } from 'antd'; // Import the Spin component from antd
import './LoadingOverlay.css'; // Import the CSS for styling

// Define props type
type LoadingOverlayProps = {
  isLoading: boolean;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <Spin size="large" />
    </div>
  );
};

export default LoadingOverlay;