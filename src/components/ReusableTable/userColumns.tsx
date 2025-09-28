import { Button } from 'antd';
import { type User } from '../../types';
import type { ColumnsType } from 'antd/es/table';

interface ColumnProps {
  handleEdit: (user: User) => void;
  handleDelete: (id: number, name: string) => void;
}

export const getUserColumns = ({
  handleEdit,
  handleDelete,
}: ColumnProps): ColumnsType<User> => [
  {
    title: '',
    dataIndex: 'avatar',
    render: (value: string) => (
      <div style={{ textAlign: 'center' }}>
        <img
          src={value || '/placeholder.svg'}
          alt="Avatar"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      </div>
    ),
    responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: (email: string) => (
      <a href={`mailto:${email}`} style={{ color: '#1677ff' }}>
        {email}
      </a>
    ),
    responsive: ['sm', 'md', 'lg', 'xl'],
  },
  {
    title: 'First Name',
    dataIndex: 'first_name',
    responsive: ['xs', 'md', 'lg', 'xl'],
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    responsive: ['xs', 'md', 'lg', 'xl'],
  },
  {
    title: 'Action',

    render: (_: unknown, record: User) => (
      <div
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
        }}
      >
        <Button
          type="primary"
          style={{ borderRadius: 2 }}
          onClick={() => handleEdit(record)}
        >
          Edit
        </Button>
        <Button
          danger
          type="primary"
          style={{ borderRadius: 2 }}
          onClick={() =>
            handleDelete(record.id, `${record.first_name} ${record.last_name}`)
          }
        >
          Delete
        </Button>
      </div>
    ),
    align: 'center',
    responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
  },
];
