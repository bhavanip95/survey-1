/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import AllQuestions from './AllQuestions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CRow, CCol } from '@coreui/react'
import { useParams } from 'react-router-dom'

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

const SurveyEdit = () => {
  const [surveyName, setSurveyName] = useState()
  const [companyList, setCompanyList] = useState([])
  const [companyName, setCompanyName] = useState('')
  const [questions, setQuestions] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [data, setData] = useState([])
  const { surveyId } = useParams()
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
    let payload = { survey_id: surveyId }
    axios({
      method: 'post',
      url: '/survey_edit',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response.data[0])
      let surveyData = response.data[0]
      //       company_name: "shriram Solutions"
      // questions_name: "Do you track gross profit by customer/project and by product/service?|Do you track revenue/sales per person per month?|Does your management team know what revenue/sales you need to achieve each month to breakeven?|Is your biggest customer less than 25% of your sales/revenue?|Have you distributed an organisational chart to your staff?|Have you distributed position descriptions to your supervisors/managers?|Do you maintain a rolling 13 week cash flow forecast?|Do you know how long your working capital cycle is in days?"
      // survey_company_id: "1"
      // survey_end_date: "2022-03-01 00:00:00"
      // survey_id: "1"
      // survey_start_date: "2022-02-25 09:26:52"
      // survey_title: "Perforance"
      setSurveyName(surveyData.survey_title)

      let surveyQuestions = surveyData.questions_name.split('|')
      console.log(surveyQuestions)
      let allQuestions = surveyQuestions.map((item, index) => {
        return { question_master_id: index, question_name: item }
      })
      console.log(allQuestions)
      setQuestions(allQuestions)
      //   setStartDate(surveyData.survey_start_date)
      //   setEndDate(surveyData.survey_end_date)
    })
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
      .then((response) => console.log(response))
      .catch((error) => {
        alert('error adding survey form')
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
            <CFormLabel htmlFor="Company List">Select Company from the Options</CFormLabel>
            <CFormSelect onChange={(event) => setCompanyName(event.target.value)}>
              {companyList.map((company) => (
                <option key={company.user_id} value={company.user_id}>
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
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}
export default SurveyEdit
