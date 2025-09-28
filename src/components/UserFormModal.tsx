import { Modal, Form as AntForm, Input, Button, Row, Col } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { type UserForm } from '../types';

interface UserFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (data: UserForm) => void;
  defaultValues?: UserForm;
  loading?: boolean;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  defaultValues,
  loading = false,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserForm>({
    defaultValues: defaultValues || {
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
    },
  });

  useEffect(() => {
    if (visible) {
      reset(
        defaultValues || {
          first_name: '',
          last_name: '',
          email: '',
          avatar: '',
        }
      );
    }
  }, [defaultValues, visible, reset]);

  const handleFormSubmit = (data: UserForm) => {
    onSubmit(data);
  };

  return (
    <Modal
      title={defaultValues ? 'Edit User' : 'Create User'}
      open={visible}
      onCancel={onCancel}
      footer={null}
      confirmLoading={loading}
    >
      <AntForm onFinish={handleSubmit(handleFormSubmit)} layout="vertical">
        {['first_name', 'last_name', 'email', 'avatar'].map((field) => (
          <AntForm.Item
            key={field}
            label={field.replace('_', ' ').toUpperCase()}
            validateStatus={errors[field as keyof UserForm] ? 'error' : ''}
            help={errors[field as keyof UserForm]?.message}
            required
          >
            <Controller
              name={field as keyof UserForm}
              control={control}
              rules={{
                required: `${field.replace('_', ' ')} is required`,
                ...(field === 'email' && {
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                }),
                ...(field === 'avatar' && {
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: 'Must be a valid URL',
                  },
                }),
              }}
              render={({ field: f }) => <Input {...f} placeholder={field} />}
            />
          </AntForm.Item>
        ))}
        <Row justify="end" gutter={8}>
          <Col xs={12} sm={6}>
            <Button block onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          </Col>
          <Col xs={12} sm={6}>
            <Button
              type="primary"
              block
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              {defaultValues ? 'Update' : 'Create'}
            </Button>
          </Col>
        </Row>
      </AntForm>
    </Modal>
  );
};
