import React from 'react'
import { Typography } from 'antd'

import { contactUsData } from '../../../data/public/privacy-policy/privacy-policy'

const { Title, Text } = Typography

const ContactUs = () => {
  return (
    <div className='privacy-policy u-margin-bottom-small'>
      <Title level={2}>{contactUsData.header}</Title>
      <Text className='privacy-policy-paragraph'>
        {contactUsData.firstParagraph}
      </Text>
      <ul style={{ marginLeft: 20 }}>
        {contactUsData.bulleted.map((data) => {
          return (
            <li>
              <Text className='privacy-policy-paragraph'>{data}</Text>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ContactUs
