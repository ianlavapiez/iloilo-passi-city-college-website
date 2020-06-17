import React from 'react'
import { Typography } from 'antd'

import {
  interpretationAndDefinitionsData,
  definitionsData,
} from '../../../data/public/privacy-policy/privacy-policy'

const { Title, Text } = Typography

const InterpretationAndDefinitions = () => {
  return (
    <div className='privacy-policy u-margin-bottom-small'>
      <Title level={2}>{interpretationAndDefinitionsData.header}</Title>
      <Title level={3}>{interpretationAndDefinitionsData.subHeader}</Title>
      <Text className='privacy-policy-paragraph'>
        {interpretationAndDefinitionsData.firstParagraph}
      </Text>
      <Title level={3}>{definitionsData.subHeader}</Title>
      <Text className='privacy-policy-paragraph'>
        {definitionsData.firstParagraph}
      </Text>
      <ul style={{ marginLeft: 20 }}>
        {definitionsData.definitions.map((definition) => {
          return (
            <li>
              <Text className='privacy-policy-paragraph'>
                <Text className='bold'>{definition.header}</Text>
                {definition.details}
              </Text>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default InterpretationAndDefinitions
