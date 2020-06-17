import React from 'react'
import { Typography } from 'antd'

import { linksToOtherWebsitesData } from '../../../data/public/privacy-policy/privacy-policy'

const { Title, Text } = Typography

const LinksToOtherWebsites = () => {
  return (
    <div className='privacy-policy u-margin-bottom-small'>
      <Title level={2}>{linksToOtherWebsitesData.header}</Title>
      <Text className='privacy-policy-paragraph'>
        {linksToOtherWebsitesData.firstParagraph}
      </Text>
      <Text className='privacy-policy-paragraph'>
        {linksToOtherWebsitesData.secondParagraph}
      </Text>
    </div>
  )
}

export default LinksToOtherWebsites
