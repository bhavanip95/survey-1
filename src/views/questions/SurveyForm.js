/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import {
  CCard,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CFormCheck,
  CButton,
} from '@coreui/react'
import axios from 'axios'

const SurveyForm = () => {
  const [companyList, setCompanyList] = useState([])
  //const [singleCompanyList, setSingleCompanyList] = useState([])

  useEffect(function () {
    axios({
      method: 'get',
      url: '/company_lists',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => setCompanyList(response.data))
  }, [])

  // const onddlchange = (company.user_id) => {
  //   console.log(company.user_id)
  //   axios({
  //     method: 'get',
  //     url: '/company_lists'
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then((response) => console.log(response.data))
  // }

  return (
    <CCard>
      <CCardBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel htmlFor="Survey Title">Survey Title</CFormLabel>
            <CFormInput type="text" size="lg" placeholder="Enter survey title name" />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="Company List">Select Company from the Options</CFormLabel>
            <CFormSelect>
              {companyList.map((company) => (
                <option key={company.user_id} value={company.user_id}>
                  {company.company_name}
                </option>
              ))}
            </CFormSelect>
          </div>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CFormCheck type="checkbox" value="" aria-label="Checkbox for following text input" />
            </CInputGroupText>
            <CFormInput aria-label="Text input with checkbox" />
          </CInputGroup>
          <Calendar />
          <CButton classname="text-center" color="primary" size="lg" disabled>
            Submit
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}
export default SurveyForm
