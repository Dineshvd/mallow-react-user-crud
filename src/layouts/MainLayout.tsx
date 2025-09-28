import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
