import { message } from 'antd';

type MessageType = 'success' | 'error' | 'info' | 'warning';

export const showSnackbar = (
  type: MessageType,
  content: string,
  duration = 3
) => {
  switch (type) {
    case 'success':
      message.success(content, duration);
      break;
    case 'error':
      message.error(content, duration);
      break;
    case 'info':
      message.info(content, duration);
      break;
    case 'warning':
      message.warning(content, duration);
      break;
  }
};
