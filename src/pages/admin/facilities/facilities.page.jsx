import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Sidebar from '../../../components/admin/sidebar/sidebar.component';
import Navbar from '../../../components/admin/navbar/navbar.component';
import Footer from '../../../components/admin/footer/footer.component';
import Modal from '../../../components/admin/facilities-modal/facilities-modal.component';
import Table from '../../../components/admin/facilities-table/facilities-table.component';

const { Content } = Layout;
const { Title } = Typography;

const FacilitiesPage = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);

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
              <Title level={2}>Facilities</Title>
              <div style={{ marginBottom: 15 }}>
                <Modal
                  setVisible={setVisible}
                  edit={edit}
                  visible={visible}
                  facilities={data}
                  setEdit={setEdit}
                />
              </div>
              <Table
                setVisible={setVisible}
                setData={setData}
                setEdit={setEdit}
              />
            </div>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated.isAuthenticated,
  };
};

export default withRouter(connect(mapStateToProps)(FacilitiesPage));
