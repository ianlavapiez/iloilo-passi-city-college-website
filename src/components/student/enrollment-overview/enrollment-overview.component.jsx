import React from 'react'
import { Statistic, Card, Row, Col } from 'antd'

const EnrollmentOverview = () => {
  return (
    <div className='site-statistic-demo-card'>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title='Total Paid'
              value={1000.0}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix='P'
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title='Total Balance'
              value={4000.0}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix='P'
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title='Total'
              value={5000.0}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix='P'
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default EnrollmentOverview
