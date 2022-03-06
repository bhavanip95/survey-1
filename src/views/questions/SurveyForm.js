/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import AllQuestions from './AllQuestions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CRow, CCol } from '@coreui/react'
import { useHistory } from 'react-router-dom'

import {
  CCard,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'
import axios from 'axios'
import toast from '../../components/Alert'

const SurveyForm = () => {
  const [surveyName, setSurveyName] = useState()
  const [companyList, setCompanyList] = useState([])
  const [companyName, setCompanyName] = useState('')
  const [questions, setQuestions] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [data, setData] = useState([])
  const history = useHistory()

  const listQuestions = () => {
    axios({
      method: 'get',
      url: '/question_list',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      setQuestions(response.data)
    })
  }
  const questionDeleteHandlder = (id) => {
    console.log(id)
    setQuestions((prev) => {
      let newdata = prev.filter((obj) => obj.question_master_id !== id)
      return newdata
    })
  }
  const questionUpdatedHandler = (id, value) => {
    console.log(id)
    console.log(value)
    setQuestions((prev) => {
      let index = prev.findIndex((obj) => obj.question_master_id === id)
      let newData = prev
      newData[index].question_name = value
      return newData
    })
  }
  useEffect(function () {
    axios({
      method: 'get',

      url: '/company_lists',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => setCompanyList(response.data))

    listQuestions()
  }, [])

  const saveSurveyHandler = (event) => {
    event.preventDefault()
    let d1 = startDate.toISOString().split('T')[0]
    let d2 = endDate.toISOString().split('T')[0]
    // console.log(surveyName)
    // console.log(companyName)
    // console.log(questions)
    // console.log(d1)
    // console.log(d2)
    let payload = {
      survey_title: surveyName,
      company_id: companyName,
      survey_startdate: d1,
      survey_enddate: d2,
      questions: questions,
    }
    console.log(payload)
    axios({
      method: 'post',
      url: '/survey_form',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          toast('Survey created!', {
            position: toast.POSITION.TOP_CENTER,
            type: toast.TYPE.SUCCESS,
          })
          history.push('/SurveyList')
        }
      })

      .catch((error) => {
        toast('error adding survey form', {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.ERROR,
        })
      })
  }

  return (
    <CCard>
      <CCardBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel htmlFor="Survey Title">Survey Title</CFormLabel>
            <CFormInput
              type="text"
              size="lg"
              placeholder="Enter survey title name"
              value={surveyName}
              onChange={(event) => setSurveyName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="Company List">Company Name</CFormLabel>
            <CFormSelect onChange={(event) => setCompanyName(event.target.value)}>
              <option>Select Company name from the options</option>
              {companyList.map((company) => (
                <option key={company.company_id} value={company.company_id}>
                  {company.company_name}
                </option>
              ))}
            </CFormSelect>
          </div>
          <AllQuestions
            data={questions}
            updateCallback={questionUpdatedHandler}
            deleteCallback={questionDeleteHandlder}
          />{' '}
          <br /> <br />
          <CRow className="p-3 m-3 border bg-light">
            <CCol xs={6}>
              <label>survey Start date</label>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
              />
            </CCol>

            <CCol xs={6}>
              <label>survey End date</label>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </CCol>
          </CRow>
          <br />
          <div className="d-grid gap-2 col-6 mx-auto">
            <CButton color="primary" onClick={saveSurveyHandler}>
              Submit
            </CButton>
            <CCol xs={4} text-center>
              <CButton onClick={() => history.push('/SurveyList')}>Go back</CButton>
            </CCol>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}
export default SurveyForm
