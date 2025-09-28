import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Modal, Row, Segmented } from 'antd';
import { type AppDispatch, type RootState } from '../store';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../store/slices/userSlice';
import { showSnackbar } from '../utils/snackbar';
import { type User, type UserForm } from '../types';
import { ResuableTable } from '../components/ReusableTable/ResuableTable';
import { UserFormModal } from '../components/UserFormModal';
import { Card } from '../components/Card';
import { Pagination } from '../components/Pagination';
import {
  SearchOutlined,
  TableOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { getUserColumns } from '../components/ReusableTable/userColumns';
import '../App.css';

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, page, perPage, total, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [isListView, setIsListView] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers({ page, perPage }));
  }, [dispatch, page, perPage]);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  const onPageChange = (newPage: number) => {
    dispatch(fetchUsers({ page: newPage, perPage }));
  };

  const handleEdit = useCallback((user: User) => {
    setEditUser(user);
    setModalVisible(true);
  }, []);

  const handleDelete = useCallback(
    (id: number, name: string) => {
      Modal.confirm({
        title: 'Confirm Deletion',
        content: `Are you sure you want to delete ${name}?`,
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: () => {
          dispatch(deleteUser(id))
            .unwrap()
            .then(() => showSnackbar('success', 'User deleted successfully'))
            .catch((err) =>
              showSnackbar('error', err || 'Failed to delete user')
            );
        },
      });
    },
    [dispatch]
  );

  const handleCreate = () => {
    setEditUser(null);
    setModalVisible(true);
  };

  const handleFormSubmit = (data: UserForm) => {
    setModalLoading(true);
    if (editUser?.id) {
      dispatch(updateUser({ id: editUser.id, data }))
        .unwrap()
        .then(() => {
          showSnackbar('success', 'User updated successfully');
          setModalVisible(false);
          setEditUser(null);
        })
        .catch((err) => showSnackbar('error', err || 'Failed to update user'))
        .finally(() => setModalLoading(false));
    } else {
      dispatch(createUser(data))
        .unwrap()
        .then(() => {
          showSnackbar('success', 'User created successfully');
          setModalVisible(false);
          setEditUser(null);
        })
        .catch((err) => showSnackbar('error', err || 'Failed to create user'))
        .finally(() => setModalLoading(false));
    }
  };

  const cardItems = filteredUsers.map((user) => ({
    id: user.id,
    title: `${user.first_name} ${user.last_name}`,
    description: user.email,
    cover: user.avatar,
  }));

  const columns = useMemo(
    () => getUserColumns({ handleEdit, handleDelete }),
    [handleEdit, handleDelete]
  );

  return (
    <div className="users-list-container">
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        <Col xs={24} sm={24} md={8} lg={15}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Users</h1>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6}>
          <div className="search-input-container">
            <Input
              placeholder="input search text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
              className="search-input"
            />
            <div className="search-icon-container">
              <SearchOutlined className="search-icon" />
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={4} lg={2}>
          <Button
            type="primary"
            onClick={handleCreate}
            className="create-button"
            style={{ borderRadius: 2, width: '100%' }}
          >
            Create User
          </Button>
        </Col>
      </Row>

      <Row style={{ marginTop: 16 }}>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Segmented
            value={isListView ? 'table' : 'card'}
            onChange={(val) => setIsListView(val === 'table')}
            options={[
              { label: 'Table', value: 'table', icon: <TableOutlined /> },
              { label: 'Card', value: 'card', icon: <UnorderedListOutlined /> },
            ]}
          />
        </Col>
      </Row>

      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          {isListView ? (
            <ResuableTable
              data={filteredUsers}
              columns={columns}
              rowKey="id"
              loading={loading}
              error={error}
            />
          ) : (
            <Card
              items={cardItems}
              onEdit={(item) =>
                handleEdit(filteredUsers.find((u) => u.id === item.id)!)
              }
              onDelete={(item) =>
                handleDelete(item.id as number, item.title as string)
              }
            />
          )}
        </Col>
      </Row>

      <Row className="pagination-row">
        <Col>
          <Pagination
            current={page}
            total={total}
            pageSize={perPage}
            onChange={onPageChange}
          />
        </Col>
      </Row>

      <UserFormModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleFormSubmit}
        defaultValues={editUser || undefined}
        loading={modalLoading}
      />
    </div>
  );
};

export default UsersList;
