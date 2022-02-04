import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilDrop, cilSpeedometer, cilUser, cilUserPlus } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Users',
    items: [
      {
        component: CNavItem,
        name: 'Users',
        to: '/users',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Create User',
        to: '/createUser',
        icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Pages',
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _nav
