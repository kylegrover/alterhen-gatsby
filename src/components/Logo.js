import React from 'react'
import PropTypes from 'prop-types'

export const LogoText = ({ className }) => (
  <span className={`logo-text ${className}`}>a\ter<span className="logo-text-HEN">HEN</span></span>
)

LogoText.propTypes = {
  LogoText: PropTypes.node,
  className: PropTypes.string,
}

export const LogoIcon = ({ className }) => (
  <span className={`logo-icon ${className}`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="165" height="165" viewBox="0 0 165 165" fill="none">
    <path d="M1.19209e-06 0H28.1698V164.361H1.19209e-06V0Z" fill="black"/>
    <path d="M17.7068 23.6694L39.1127 5.3384L159.19 145.852L137.784 164.183L17.7068 23.6694Z" fill="black"/>
    <path d="M164.19 0V28.1992L0 28.1992L1.19209e-06 0H164.19Z" fill="black"/>
    <path d="M164.19 64.4554V92.6546L0 92.6546L1.19209e-06 64.4554L164.19 64.4554Z" fill="black"/>
    <path d="M164.19 136.162V164.361H1.19209e-06V136.162L164.19 136.162Z" fill="black"/>
    <path d="M136.02 0H164.19V164.361H136.02V0Z" fill="black"/>
    </svg>
  </span>
)

LogoIcon.propTypes = {
  LogoIcon: PropTypes.node,
  className: PropTypes.string,
}

const Logo = ({ className }) => (
  <span className={`logo-full ${className}`}>
    <LogoIcon/>
    <LogoText/>
  </span>
)

Logo.propTypes = {
  Logo: PropTypes.node,
  className: PropTypes.string,
}

export default Logo