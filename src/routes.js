import React from 'react'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/users/Users'))
const CreateUserForm = React.lazy(() => import('./views/users/CreateUser'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: Users },
  { path: '/createUser', name: 'Create User', component: CreateUserForm },
]

export default routes
