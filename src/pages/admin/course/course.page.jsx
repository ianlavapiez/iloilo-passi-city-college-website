import React from 'react';
import { Layout, Typography } from 'antd';

import Sidebar from '../../../components/admin/sidebar/sidebar.component';
import Navbar from '../../../components/admin/navbar/navbar.component';
import Footer from '../../../components/admin/footer/footer.component';
import Modal from '../../../components/admin/course-modal/course-modal.component';
import Table from '../../../components/admin/course-table/course-table.component';

const { Content } = Layout;
const { Title } = Typography;

const CoursePage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'2'} />
      <Layout className='site-layout'>
        <Navbar />
        <Content style={{ margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 20, minHeight: '85vh' }}
          >
            <div style={{ marginTop: 0 }}>
              <Title level={2}>Courses</Title>
              <div style={{ marginBottom: 15 }}>
                <Modal />
              </div>
              <Table />
            </div>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default CoursePage;
