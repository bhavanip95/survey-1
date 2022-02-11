import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CFormTextarea,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import React from 'react'
import data from '../../data/data'
import { cilX } from '@coreui/icons'

const Question = (props) => {
  const categoryId = 1
  const questions = data.filter((obj) => obj.category_id === categoryId)
  return (
    <CCard>
      <CCardHeader>Edit Questions</CCardHeader>
      <CCardBody>
        <CListGroup>
          {questions.map((question) => {
            return (
              <CListGroupItem
                key={question.serial_number}
                className="d-flex justify-content-between align-items-center"
              >
                <CFormTextarea>{question.question}</CFormTextarea>
                <div>
                  {/* <CIcon icon={cilPencil} size="lg" />
                  <span> </span> */}
                  <CIcon icon={cilX} size="lg" />
                </div>
              </CListGroupItem>
            )
          })}
        </CListGroup>
      </CCardBody>
      <CCardFooter></CCardFooter>
    </CCard>
  )
}
export default Question
