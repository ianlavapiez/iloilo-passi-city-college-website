import React from 'react'
import { Typography } from 'antd'

import { changesToThisPrivacyPolicyData } from '../../../data/public/privacy-policy/privacy-policy'

const { Title, Text } = Typography

const ChangesToThisPrivacyPolicy = () => {
  return (
    <div className='privacy-policy u-margin-bottom-small'>
      <Title level={2}>{changesToThisPrivacyPolicyData.header}</Title>
      <Text className='privacy-policy-paragraph'>
        {changesToThisPrivacyPolicyData.firstParagraph}
      </Text>
      <Text className='privacy-policy-paragraph'>
        {changesToThisPrivacyPolicyData.secondParagraph}
      </Text>
      <Text className='privacy-policy-paragraph'>
        {changesToThisPrivacyPolicyData.thirdParagraph}
      </Text>
    </div>
  )
}

export default ChangesToThisPrivacyPolicy
