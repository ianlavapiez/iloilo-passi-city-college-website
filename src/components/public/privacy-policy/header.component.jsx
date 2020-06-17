import React from 'react'
import { Typography } from 'antd'

import { privacyPolicyData } from '../../../data/public/privacy-policy/privacy-policy'

const { Title, Text } = Typography

const Header = () => {
  return (
    <div className='privacy-policy u-margin-bottom-small'>
      <Title level={2}>{privacyPolicyData.header}</Title>
      <Text className='privacy-policy-paragraph'>
        {privacyPolicyData.firstParagraph}
      </Text>
      <Text className='privacy-policy-paragraph'>
        {privacyPolicyData.secondParagraph}
      </Text>
      <Text className='privacy-policy-paragraph'>
        {privacyPolicyData.thirdParagraph}
      </Text>
    </div>
  )
}

export default Header
