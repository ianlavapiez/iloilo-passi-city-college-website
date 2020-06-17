import React from 'react'

import Header from './header.component'
import InterpretationAndDefinitions from './interpretation-and-definitions.component'
import CollectingAndUsingYourPersonalData from './collecting-and-using-your-personal-data.component'
import UseOfYourPersonalData from './use-of-your-personal-data.component'
import RetentionOfYourPersonalData from './retention-of-your-personal-data.component'
import TransferOfYourPersonalData from './transfer-of-your-personal-data.component'
import DisclosureOfYourPersonalData from './disclosure-of-your-personal-data.component'
import SecurityOfYourPersonalData from './security-of-your-personal-data.component'
import LinksToOtherWebsites from './links-to-other-websites.component'
import ChangesToThisPrivacyPolicy from './changes-to-this-privacy-policy.component'
import ContactUs from './contact-us.component'

const PrivacyPolicy = () => {
  return (
    <div className='row'>
      <Header />
      <InterpretationAndDefinitions />
      <CollectingAndUsingYourPersonalData />
      <UseOfYourPersonalData />
      <RetentionOfYourPersonalData />
      <TransferOfYourPersonalData />
      <DisclosureOfYourPersonalData />
      <SecurityOfYourPersonalData />
      <LinksToOtherWebsites />
      <ChangesToThisPrivacyPolicy />
      <ContactUs />
    </div>
  )
}

export default PrivacyPolicy
