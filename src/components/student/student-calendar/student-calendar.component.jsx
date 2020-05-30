import React from 'react'
import { Calendar, Badge } from 'antd'

function getListData(value) {
  let listData
  switch (value.date()) {
    case 8:
      listData = [{ type: 'success', content: 'Refresher subject 1' }]
      break
    case 10:
      listData = [{ type: 'success', content: 'Refresher subject 2' }]
      break
    case 15:
      listData = [{ type: 'success', content: 'Refresher subject 3' }]
      break
    default:
  }
  return listData || []
}

function dateCellRender(value) {
  const listData = getListData(value)
  return (
    <ul className='events'>
      {listData.map((item) => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  )
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394
  }
}

function monthCellRender(value) {
  const num = getMonthData(value)
  return num ? (
    <div className='notes-month'>
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null
}

const StudentCalendar = () => {
  return (
    <Calendar
      style={{ padding: 10, height: '60vh' }}
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  )
}

export default StudentCalendar
