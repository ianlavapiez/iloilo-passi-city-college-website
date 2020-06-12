import React, { useEffect, useState } from 'react'
import { Statistic, Card, Row, Col } from 'antd'
import { connect } from 'react-redux'

const EnrollmentOverview = ({ payments }) => {
  const [totalPaid, setTotalPaid] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)
  const [total, setTotal] = useState(0)

  const accumulateTotal = (payments) => {
    if (payments.length > 0) {
      let sum = payments.reduce((accumulator, item) => {
        return accumulator + item.fee
      }, 0)

      setTotal(sum)
    }
  }

  const accumulateTotalPaid = (payments) => {
    if (payments.length > 0) {
      let sum = payments.reduce((accumulator, item) => {
        return accumulator + item.accumulatedPayment
      }, 0)

      setTotalPaid(sum)
    }
  }

  useEffect(() => {
    accumulateTotal(payments)
    accumulateTotalPaid(payments)

    const accumulateTotalBalance = () => {
      const balance = total - totalPaid

      setTotalBalance(balance)
    }

    accumulateTotalBalance()
  }, [payments, total, totalPaid])

  return (
    <div className='site-statistic-demo-card'>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title='Total Paid'
              value={totalPaid}
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
              value={totalBalance}
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
              value={total}
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

const mapStateToProps = (state) => {
  return {
    payments: state.payments.studentPayments,
  }
}

export default connect(mapStateToProps)(EnrollmentOverview)
