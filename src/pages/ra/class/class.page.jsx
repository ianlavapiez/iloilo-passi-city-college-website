import React, { useState, useEffect } from 'react'
import { Layout, Breadcrumb, Typography } from 'antd'
import { connect } from 'react-redux'

import { getRAClasses } from '../../../redux/class/class.actions'

import Sidebar from '../../../components/ra/sidebar/sidebar.component'
import Navbar from '../../../components/ra/navbar/navbar.component'
import RaFooter from '../../../components/ra/footer/footer.component'
import ClassTable from '../../../components/ra/class-table/class-table.component'
import ClassModal from '../../../components/ra/class-modal/class-modal.component'
import ClassStatusModal from '../../../components/ra/class-status-modal/class-status-modal.component'

const { Content } = Layout
const { Title } = Typography

const ClassPage = ({ raId, getRAClasses }) => {
  const [edit, setEdit] = useState(false)
  const [data, setData] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [statusModalVisible, setStatusModalVisible] = useState(false)

  useEffect(() => {
    if (raId) {
      getRAClasses(raId)
    }
  }, [raId, getRAClasses])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'3'} />
      <Layout className='site-layout'>
        <Navbar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '40px 0px -20px 30px' }}>
            <Breadcrumb.Item>
              <Title level={3}>List of Classes</Title>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className='site-layout-background'
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Layout style={{ marginBottom: '12px' }}>
              <ClassModal
                data={data}
                edit={edit}
                setEdit={setEdit}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
              <ClassStatusModal
                setStatusModalVisible={setStatusModalVisible}
                data={data}
                statusModalVisible={statusModalVisible}
              />
            </Layout>
            <ClassTable
              setEdit={setEdit}
              setStatusModalVisible={setStatusModalVisible}
              setModalVisible={setModalVisible}
              setData={setData}
            />
          </Content>
        </Layout>
        <RaFooter />
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    raId: state.firebase.auth.uid,
  }
}

const mapDispatchToProps = {
  getRAClasses,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassPage)
