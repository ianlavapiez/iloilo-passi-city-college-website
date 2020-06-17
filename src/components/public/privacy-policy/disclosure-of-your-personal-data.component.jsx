import React, { Fragment } from 'react'
import { Typography } from 'antd'

import { disclosureOfYourPersonalData } from '../../../data/public/privacy-policy/privacy-policy'

const { Title, Text } = Typography

const DisclosureOfYourPersonalData = () => {
  return (
    <div className='privacy-policy u-margin-bottom-small'>
      <Title level={2}>{disclosureOfYourPersonalData.header}</Title>
      {disclosureOfYourPersonalData.bulletedOne.map((data) => {
        return (
          <Fragment>
            <Title level={3}>{data.header}</Title>
            <Text className='privacy-policy-paragraph'>{data.one}</Text>
          </Fragment>
        )
      })}
      <ul style={{ marginLeft: 30 }}>
        {disclosureOfYourPersonalData.bulleted.map((data) => {
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

export default DisclosureOfYourPersonalData
