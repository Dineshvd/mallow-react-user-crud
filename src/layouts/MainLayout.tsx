import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import BigLoader from '../components/BigLoader';

const { Content } = Layout;

const MainLayout = () => {
  const { token, loading } = useSelector((state: RootState) => state.auth);

  if (loading || !token)
    return (
      <>
        <BigLoader />
      </>
    );

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
