import { Table, type TableProps } from 'antd';
import { AlertMessage } from '../AlertMessage';

interface Table<T> {
  data: T[];
  columns: TableProps<T>['columns'];
  rowKey: keyof T | ((record: T) => string | number);
  loading?: boolean;
  error?: string | null;
  pagination?: {
    current: number;
    total: number;
    pageSize: number;
    onChange: (page: number) => void;
  };
}

export function ResuableTable<T>({
  data,
  columns,
  rowKey,
  loading,
  error,
}: Table<T>) {
  return (
    <>
      <AlertMessage message={error} />
      <Table
        dataSource={data}
        columns={columns}
        rowKey={rowKey}
        pagination={false}
        loading={loading}
        size="large"
      />
    </>
  );
}
