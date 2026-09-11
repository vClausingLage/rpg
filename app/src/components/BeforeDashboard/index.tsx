import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner type="success">
        <h4>Herzlich willkommen!</h4>
      </Banner>
    </div>
  )
}

export default BeforeDashboard
