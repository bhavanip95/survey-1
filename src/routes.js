import React from 'react'

import Question from './views/questions/Question'
const Questionnaire = React.lazy(() => import('./views/questions/Questionnaire'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/users/Users'))
const SurveyForm = React.lazy(() => import('./views/questions/SurveyForm'))
const Login = React.lazy(() => {
  import('./views/pages/login/Login')
})

const routes = [
  { path: '/', exact: true, name: 'Home', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: Users },
  { path: '/SurveyForm', name: 'SurveyForm', component: SurveyForm },
  {
    path: '/questionnaire',
    name: 'Questionnaire',
    component: Questionnaire,
    exact: true,
  },
  {
    path: '/questionnaire/edit/:categoryId',
    name: 'Edit',
    component: Question,
  },
]

export default routes
