import { Spin } from 'antd';
import React from 'react';

const BigLoader: React.FC = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default BigLoader;
