import React, { Fragment } from 'react'
import { Typography } from 'antd'

import {
  collectingAndUsingYourPersonalData,
  usageData,
  trackingTechnologiesAndCookies,
} from '../../../data/public/privacy-policy/privacy-policy'

const { Title, Text } = Typography

const CollectingAndUsingYourPersonalData = () => {
  return (
    <div className='privacy-policy u-margin-bottom-small'>
      <Title level={2}>{collectingAndUsingYourPersonalData.header}</Title>
      <Title level={3}>{collectingAndUsingYourPersonalData.secondHeader}</Title>
      <Title level={4}>{collectingAndUsingYourPersonalData.subHeader}</Title>
      <Text className='privacy-policy-paragraph'>
        {collectingAndUsingYourPersonalData.firstParagraph}
      </Text>
      <ul style={{ marginLeft: 20 }}>
        {collectingAndUsingYourPersonalData.bulleted.map((definition) => {
          return (
            <li>
              <Text className='privacy-policy-paragraph'>{definition}</Text>
            </li>
          )
        })}
      </ul>
      {/* Usage Data */}
      <Title level={4}>{usageData.subHeader}</Title>
      <Text className='privacy-policy-paragraph'>
        {usageData.firstParagraph}
      </Text>
      <Text className='privacy-policy-paragraph'>
        {usageData.secondParagraph}
      </Text>
      <Text className='privacy-policy-paragraph'>
        {usageData.thirdParagraph}
      </Text>
      <Text className='privacy-policy-paragraph'>
        {usageData.fourthParagraph}
      </Text>
      {/* Tracking Technologies and Cookies */}
      <Title level={4}>{trackingTechnologiesAndCookies.subHeader}</Title>
      <Text className='privacy-policy-paragraph'>
        {trackingTechnologiesAndCookies.firstParagraph}
      </Text>
      <Text className='privacy-policy-paragraph'>
        {trackingTechnologiesAndCookies.secondParagraph}
      </Text>
      <Text className='privacy-policy-paragraph'>
        {trackingTechnologiesAndCookies.thirdParagraph}
      </Text>
      <Text className='privacy-policy-paragraph'>
        {trackingTechnologiesAndCookies.fourthParagraph}
      </Text>
      <ul style={{ marginLeft: 20 }}>
        {trackingTechnologiesAndCookies.bulleted.map((definition) => {
          return (
            <Fragment>
              <li className='u-margin-bottom-small'>
                <Text className='bold'>{definition.header}</Text>
              </li>
              <li className='cookies-list'>
                <Text className='privacy-policy-paragraph'>
                  {definition.one}
                </Text>
              </li>
              <li className='cookies-list'>
                <Text className='privacy-policy-paragraph'>
                  {definition.two}
                </Text>
              </li>
              <li className='cookies-list'>
                <Text className='privacy-policy-paragraph'>
                  {definition.three}
                </Text>
              </li>
            </Fragment>
          )
        })}
      </ul>
      <Text className='privacy-policy-paragraph'>
        {trackingTechnologiesAndCookies.fifthParagraph}
      </Text>
    </div>
  )
}

export default CollectingAndUsingYourPersonalData
