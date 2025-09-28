import { useEffect, useMemo } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Spin, Alert, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../store/slices/authSlice';
import { type AppDispatch, type RootState } from '../store';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const userPrefix = useMemo(() => <UserOutlined />, []);
  const lockPrefix = useMemo(() => <LockOutlined />, []);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (token) {
      navigate('/users');
    }
  }, [token, navigate]);

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    dispatch(login(data));
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '50px 0' }}>
      <h2>Login</h2>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Form.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            }}
            render={({ field }) => (
              <Input {...field} type="email" prefix={userPrefix} />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
              minLength: { value: 6, message: 'Min 6 characters' },
            }}
            render={({ field }) => (
              <Input.Password {...field} prefix={lockPrefix} />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value}>
                Remember me
              </Checkbox>
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading} block>
            {loading ? <Spin size="small" /> : 'Login'}
          </Button>
        </Form.Item>
      </Form>

      <p style={{ marginTop: 16 }}>
        Test credentials: eve.holt@reqres.in / cityslicka
      </p>
    </div>
  );
};

export default Login;
