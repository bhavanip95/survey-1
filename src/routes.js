import React from 'react'

import Question from './views/questions/Question'
const Questionnaire = React.lazy(() => import('./views/questions/Questionnaire'))
const ViewReport = React.lazy(() => import('./views/questions/ViewReport'))
const SurveyList = React.lazy(() => import('./views/questions/SurveyList'))
const Users = React.lazy(() => import('./views/users/Users'))
const SurveyForm = React.lazy(() => import('./views/questions/SurveyForm'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const SurveyEdit = React.lazy(() => import('./views/questions/SurveyEdit'))

const routes = [
  { path: '/', exact: true, name: 'Home', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: ViewReport },
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
  {
    path: '/SurveyList',
    name: 'SurveyList',
    component: SurveyList,
    exact: true,
  },
  {
    path: '/SurveyList/edit/:surveyId',
    name: 'EditSurvey',
    component: SurveyEdit,
  },
]

export default routes
