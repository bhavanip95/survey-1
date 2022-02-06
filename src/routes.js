import React from 'react'
const Questionnaire = React.lazy(() => import('./views/questions/Questionnaire'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/users/Users'))
const CreateUserForm = React.lazy(() => import('./views/users/CreateUserForm'))
const EditQuestionnaireForm = React.lazy(() => import('./views/questions/EditQuestionnaireForm'))

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
    path: '/questionnaire/id',
    name: 'Edit Questionnaire',
    component: EditQuestionnaireForm,
  },
]

export default routes
