import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      © {new Date().getFullYear()} Mallow React Task. All rights reserved.
    </AntFooter>
  );
};

export default Footer;
