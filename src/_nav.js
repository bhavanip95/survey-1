import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilUser, cilLibrary } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Settings',

    items: [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Users Management',
        to: '/users',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavGroup,
        name: 'Survey Managemnt',

        items: [
          {
            component: CNavItem,
            name: 'Questions category',
            to: '/questionnaire',
            icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Survey Form',
            to: '/SurveyForm',

            icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Survey List',
            to: '/SurveyList',

            icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
          },
        ],
      },
    ],
  },
]

export default _nav
