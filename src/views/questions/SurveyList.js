import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CButton,
  CRow,
  CCol,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdownItem,
  CDropdownDivider,
  CDropdownMenu,
  CDropdownToggle,
  CDropdown,
} from '@coreui/react'

const SurveyList = () => {
  const [data, setData] = useState([])

  const history = useHistory()

  useEffect(() => {
    listSurvey()
  }, [])
  const editSurveyHandler = (id) => {
    history.push('/SurveyList/edit/' + id)
  }

  const deleteSurveyHandler = (id) => {
    console.log('deleting')
  }
  const listSurvey = () => {
    axios({
      method: 'get',
      url: '/survey_list',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      setData(response.data)
    })
  }

  return (
    <CCard>
      <CRow className="p-3 m-0 border bg-light">
        <CCol xs={8}>
          <CFormInput
            id="exampleFormControlInput1"
            placeholder="Search Survey Title or CompanyName"
          />
        </CCol>
        <CCol xs={4} text-center>
          <CButton onClick={() => history.push('/SurveyForm')}>Create Survey</CButton>
        </CCol>
      </CRow>

      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>Survey Title</CTableHeaderCell>
            <CTableHeaderCell>Company Name</CTableHeaderCell>
            <CTableHeaderCell>Start Date</CTableHeaderCell>
            <CTableHeaderCell>End Date</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((survey) => (
            <CTableRow v-for="item in tableItems" key={survey.survey_id}>
              <CTableDataCell>{survey.survey_title}</CTableDataCell>
              <CTableDataCell>{survey.company_name}</CTableDataCell>
              <CTableDataCell>{survey.survey_start_date}</CTableDataCell>
              <CTableDataCell>{survey.survey_end_date}</CTableDataCell>
              <CDropdown variant="btn-group">
                <CDropdownToggle color="info">Action</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    onClick={() => {
                      editSurveyHandler(survey.survey_id)
                    }}
                  >
                    Edit
                  </CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem onClick={deleteSurveyHandler}>Delete</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCard>
  )
}
export default SurveyList
