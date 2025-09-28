import { Alert } from 'antd';
import React from 'react';

interface AlertMessageProps {
  message?: string | null;
  type?: 'error' | 'success' | 'info' | 'warning';
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  type = 'error',
}) => {
  if (!message) return null;
  return (
    <Alert
      message={message}
      type={type}
      showIcon
      style={{ marginBottom: 16 }}
    />
  );
};
