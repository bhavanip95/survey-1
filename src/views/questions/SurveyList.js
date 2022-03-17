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
} from '@coreui/react'
import toast from '../../components/Alert'
import CIcon from '@coreui/icons-react'
import { cilChart, cilTrash, cilPencil } from '@coreui/icons'

const SurveyList = () => {
  const [data, setData] = useState([])
  const [initialData, setInitialData] = useState([])
  const history = useHistory()

  useEffect(() => {
    listSurvey()
  }, [])
  const editSurveyHandler = (id) => {
    history.push('/SurveyList/edit/' + id)
  }
  // const reportSurveyHandler = (id) => {
  //   history.push('/dashboard/' + id)
  // }
  const searchHandler = (i) => {
    console.log(i)
    if (i.trim().toLowerCase() === '') setData((prev) => initialData)
    let searchData = initialData.filter((user) => {
      if (
        user.company_name.toLowerCase().includes(i) ||
        user.survey_title.toLowerCase().includes(i)
      )
        return user
    })
    console.log(searchData)
    setData((prev) => searchData)
  }

  const deleteSurveyHandler = (id) => {
    console.log(id)
    let payload = {
      survey_id: id,
    }
    axios({
      method: 'post',
      url: '/survey_delete',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        toast('survey deleted!', {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.INFO,
        })
        listSurvey()
      })
      .catch((error) => {
        toast('error deleting survey', {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.ERROR,
        })
      })
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
      setInitialData(response.data)
    })
  }

  return (
    <CCard>
      <CRow className="p-3 m-0 border bg-light">
        <CCol xs={8} className="p-1">
          <CFormInput
            id="exampleFormControlInput1"
            placeholder="Search Survey Title or CompanyName"
            onChange={(event) => searchHandler(event.target.value)}
          />
        </CCol>
        <CCol xs={4} className="text-center">
          <CButton size="lg" onClick={() => history.push('/SurveyForm')}>
            Create Survey
          </CButton>
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

              <CTableDataCell>
                <CRow>
                  <CCol className="p-2">
                    <CIcon
                      icon={cilPencil}
                      size="xl"
                      onClick={() => {
                        editSurveyHandler(survey.survey_id)
                      }}
                    />
                  </CCol>
                  <CCol>
                    <CIcon
                      icon={cilChart}
                      size="xxl"
                      onClick={() => history.push('/questionnaire/report/' + survey.survey_id)}
                    />
                  </CCol>
                  <CCol>
                    <CIcon
                      icon={cilTrash}
                      size="xxl"
                      disabled
                      onClick={() => {
                        deleteSurveyHandler(survey.survey_id)
                      }}
                    />
                  </CCol>
                </CRow>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCard>
  )
}
export default SurveyList
