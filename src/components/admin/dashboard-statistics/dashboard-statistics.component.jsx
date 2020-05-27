import React from 'react'
import { Statistic, Card, Row, Col } from 'antd'
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  LineOutlined,
} from '@ant-design/icons'

const DashboardStatistics = () => {
  return (
    <div className='site-statistic-demo-card'>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title='New Enrollees'
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix='%'
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title='Total Paid'
              value={90000.05}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix='P'
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title='Total Balance'
              value={10000.95}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix='P'
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title='Total'
              value={100000}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix='P'
            />
          </Card>
        </Col>
      </Row>

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

export default DashboardStatistics
