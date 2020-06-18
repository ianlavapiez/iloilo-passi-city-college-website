import React, { useEffect, useState } from 'react'
import { Statistic, Card, Row, Col } from 'antd'
import { connect } from 'react-redux'

const DashboardStatistics = ({ payments, students }) => {
  const [totalStudents, setTotalStudents] = useState(0)
  const [totalPaidStudents, setTotalPaidStudents] = useState(0)
  const [totalUnpaidStudents, setTotalUnpaidStudents] = useState(0)
  const [totalPaid, setTotalPaid] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (students) {
      let studentCount = 0

      studentCount = students.length

      setTotalStudents(studentCount)
    }
  }, [students])

  useEffect(() => {
    if (payments) {
      let sumTotalPaidStudents,
        sumTotalUnpaidStudents = 0

      let sumTotal = payments.reduce((accumulator, item) => {
        return accumulator + item.fee
      }, 0)

      setTotal(sumTotal)

      let sumTotalPaid = payments.reduce((accumulator, item) => {
        return accumulator + item.accumulatedPayment
      }, 0)

      setTotalPaid(sumTotalPaid)
      setTotalBalance(total - totalPaid)

      payments.map((payment) => {
        if (payment.fee === payment.accumulatedPayment) {
          return sumTotalPaidStudents++
        } else {
          return sumTotalUnpaidStudents++
        }
      })

      setTotalPaidStudents(sumTotalUnpaidStudents)
      setTotalUnpaidStudents(sumTotalUnpaidStudents)
    }
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
              prefix='P'
              valueStyle={{ color: '#000' }}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 9 }} gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title='Total Paid Students'
              value={totalPaidStudents}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title='Total Unpaid Students'
              value={totalUnpaidStudents}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title='Total No. of Students'
              value={totalStudents}
              valueStyle={{ color: '#000' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    payments: state.payments.payments,
    students: state.students.students,
  }
}

export default connect(mapStateToProps)(DashboardStatistics)
