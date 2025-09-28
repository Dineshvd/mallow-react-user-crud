import { Layout, Row, Col, Button, Tooltip } from 'antd';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { LogoutOutlined } from '@ant-design/icons';
import '../App.css';

const { Header: AntHeader } = Layout;

const Header = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    // navigate('/login');
  };

  return (
    <AntHeader
      style={{
        background: '#001529',
        padding: '0 24px',
      }}
    >
      <Row justify="space-between" align="middle" wrap={false}>
        <Col>
          <div style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
            Mallow
          </div>
        </Col>

        <Col style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h3
            style={{
              color: '#fff',
              margin: 0,
            }}
            className="header-username"
          >
            Elon Musk
          </h3>

          <Tooltip title="Logout">
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            />
          </Tooltip>
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
