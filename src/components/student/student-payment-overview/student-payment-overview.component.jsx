import React from 'react'
import { Statistic, Card, Row, Col } from 'antd'
import { ArrowDownOutlined, LineOutlined } from '@ant-design/icons'

const StudentPaymentOverview = () => {
  return (
    <div className='site-statistic-demo-card'>
      <Row style={{ marginTop: 9 }} gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title='Total No. of Students'
              value={100}
              precision={2}
              valueStyle={{ color: '#000' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title='Total Paid Students'
              value={50}
              precision={0}
              valueStyle={{ color: '#000' }}
              prefix={<LineOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title='Total Unpaid Students'
              value={50}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default StudentPaymentOverview
