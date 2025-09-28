import { Outlet } from 'react-router-dom';

const LoginLayout = () => {
  return (
    <div
      className="login-layout"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Outlet />
    </div>
  );
};

export default LoginLayout;
