import React from 'react'
import Question from './views/questions/Question'
const Questionnaire = React.lazy(() => import('./views/questions/Questionnaire'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/users/Users'))
const CreateUserForm = React.lazy(() => import('./views/users/CreateUserForm'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: Users },
  { path: '/createUser', name: 'Create User', component: CreateUserForm },
  {
    path: '/questionnaire',
    name: 'Questionnaire',
    component: Questionnaire,
    exact: true,
  },
  {
    path: '/questionnaire/edit',
    name: 'Edit',
    component: Question,
  },
]

export default routes
