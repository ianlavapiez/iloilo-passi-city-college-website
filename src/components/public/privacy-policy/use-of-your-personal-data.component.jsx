import React from 'react'
import { Typography } from 'antd'

import { useOfYourPersonalData } from '../../../data/public/privacy-policy/privacy-policy'

const { Title, Text } = Typography

const UseOfYourPersonalData = () => {
  return (
    <div className='privacy-policy u-margin-bottom-small'>
      <Title level={2}>{useOfYourPersonalData.header}</Title>
      <Text className='privacy-policy-paragraph'>
        {useOfYourPersonalData.firstParagraph}
      </Text>
      <ul style={{ marginLeft: 20 }}>
        {useOfYourPersonalData.bulletedOne.map((definition) => {
          return (
            <li>
              <Text className='privacy-policy-paragraph'>
                <Text className='bold'>{definition.bold}</Text>
                {definition.one}
              </Text>
            </li>
          )
        })}
      </ul>
      <Text className='privacy-policy-paragraph'>
        {useOfYourPersonalData.secondParagraph}
      </Text>
      <ul style={{ marginLeft: 20 }}>
        {useOfYourPersonalData.bulletedTwo.map((definition) => {
          return (
            <li>
              <Text className='privacy-policy-paragraph'>
                <Text className='bold'>{definition.bold}</Text>
                {definition.one}
              </Text>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UseOfYourPersonalData
