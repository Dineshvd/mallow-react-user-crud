import { useEffect, useMemo } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Spin,
  Alert,
  Checkbox,
  ConfigProvider,
  Typography,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../store/slices/authSlice';
import { type AppDispatch, type RootState } from '../store';
import '../App.css';

const { Title } = Typography;

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

  const theme = {
    token: {
      colorPrimary: '#2F80ED',
      borderRadiusLG: 12,
      borderRadius: 10,
    },
  };

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
    <ConfigProvider theme={theme}>
      <div className="login-bg">
        <div className="login-card">
          <Title
            level={3}
            style={{ marginBottom: 24, textAlign: 'center', fontWeight: 600 }}
          >
            Login
          </Title>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email?.message}
              style={{ marginBottom: 16 }}
            >
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    prefix={userPrefix}
                    className="soft-input"
                    placeholder="Email"
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password?.message}
              style={{ marginBottom: 16 }}
            >
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Min 6 characters' },
                }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    size="large"
                    prefix={lockPrefix}
                    className="soft-input"
                    placeholder="Password"
                  />
                )}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 16 }}>
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    checked={field.value}
                    style={{ borderRadius: 0 }}
                  >
                    Remember me
                  </Checkbox>
                )}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                disabled={loading}
                style={{ borderRadius: 3 }}
              >
                {loading ? <Spin size="small" /> : 'Log in'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
