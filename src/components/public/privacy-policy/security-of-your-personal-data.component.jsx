import React from 'react'
import { Typography } from 'antd'

import { securityOfYourPersonalData } from '../../../data/public/privacy-policy/privacy-policy'

const { Title, Text } = Typography

const SecurityOfYourPersonalData = () => {
  return (
    <div className='privacy-policy u-margin-bottom-small'>
      <Title level={2}>{securityOfYourPersonalData.header}</Title>
      <Text className='privacy-policy-paragraph'>
        {securityOfYourPersonalData.firstParagraph}
      </Text>
    </div>
  )
}

export default SecurityOfYourPersonalData
