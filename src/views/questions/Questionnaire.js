import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CModalHeader,
  CForm,
  CFormLabel,
  CFormInput,
  CBadge,
} from '@coreui/react'
import React, { useState } from 'react'
import { categoryData } from '../../data/data'
const QUESTIONNAIRES = categoryData
const Questionnaire = () => {
  const [visible, setVisible] = useState(false)
  const questionnaireClickedHandler = (event) => {
    event.preventDefault()
    console.log('questionnaire clicked')
  }
  return (
    <div>
      <CCard>
        <CCardHeader>
          <CButton onClick={() => setVisible(!visible)}>+</CButton>
          <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
              <CModalTitle>Add a new Questionnaire</CModalTitle>
            </CModalHeader>
            <CModalBody mode="create">
              <CForm>
                <CFormLabel>Questionnaire Title</CFormLabel>
                <CFormInput></CFormInput>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton color="primary">Add</CButton>
            </CModalFooter>
          </CModal>
        </CCardHeader>
        <CCardBody>
          <CListGroup>
            {QUESTIONNAIRES.map((questionnaire) => {
              return (
                <CListGroupItem
                  onClick={questionnaireClickedHandler}
                  className="d-flex justify-content-between align-items-center"
                  key={questionnaire.id}
                  component="a"
                >
                  {questionnaire.title}
                  <CBadge color="primary" shape="rounded-pill">
                    {questionnaire.questionsCount}
                  </CBadge>
                </CListGroupItem>
              )
            })}
          </CListGroup>
        </CCardBody>
      </CCard>
    </div>
  )
}
export default Questionnaire
