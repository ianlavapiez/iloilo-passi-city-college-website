import React from 'react'
import { Typography } from 'antd'

import { transferOfYourPersonalData } from '../../../data/public/privacy-policy/privacy-policy'

const { Title, Text } = Typography

const TransferOfYourPersonalData = () => {
  return (
    <div className='privacy-policy u-margin-bottom-small'>
      <Title level={2}>{transferOfYourPersonalData.header}</Title>
      <Text className='privacy-policy-paragraph'>
        {transferOfYourPersonalData.firstParagraph}
      </Text>
      <Text className='privacy-policy-paragraph'>
        {transferOfYourPersonalData.secondParagraph}
      </Text>
      <Text className='privacy-policy-paragraph'>
        {transferOfYourPersonalData.thirdParagraph}
      </Text>
    </div>
  )
}

export default TransferOfYourPersonalData
