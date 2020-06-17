import React from 'react'
import { Typography } from 'antd'

import { retentionData } from '../../../data/public/privacy-policy/privacy-policy'

const { Title, Text } = Typography

const RetentionOfYourPersonalData = () => {
  return (
    <div className='privacy-policy u-margin-bottom-small'>
      <Title level={2}>{retentionData.header}</Title>
      <Text className='privacy-policy-paragraph'>
        {retentionData.firstParagraph}
      </Text>
      <Text className='privacy-policy-paragraph'>
        {retentionData.secondParagraph}
      </Text>
    </div>
  )
}

export default RetentionOfYourPersonalData
