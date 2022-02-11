import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CFormTextarea,
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
  CModal,
  CModalTitle,
  CModalHeader,
  CForm,
  CFormLabel,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import React, { useState } from 'react'
import data from '../../data/data'
import { cilMove, cilX } from '@coreui/icons'

const Question = (props) => {
  const [visible, setVisible] = useState(false)
  const categoryId = 1
  const questions = data.filter((obj) => obj.category_id === categoryId)
  const addQuestionHandler = (event) => {
    event.preventDefault()
    console.log('adding question')
    // take data from modal
    //add new object to questions
  }
  let dragged
  let id
  let index
  let indexDrop
  let list
  const dragStartHandler = (event) => {
    let target = event.target
    dragged = event.target
    id = target.id
    list = target.parentNode.children
    for (let i = 0; i < list.length; i += 1) {
      if (list[i] === dragged) {
        index = i
      }
    }
  }
  const dragOverHandler = (event) => {
    event.preventDefault()
  }
  const dropHandler = (event) => {
    console.log('dropped')
    let target = event.target
    if (target.className.includes('dropzone') && target.id !== id) {
      dragged.remove(dragged)
      for (let i = 0; i < list.length; i += 1) {
        if (list[i] === target) {
          indexDrop = i
        }
      }
      console.log(index, indexDrop)
      if (index > indexDrop) {
        target.before(dragged)
      } else {
        target.after(dragged)
      }
    }
  }
  let i = 0
  return (
    <CCard>
      <CCardHeader>
        <CButton onClick={() => setVisible(!visible)}>+</CButton>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Add a new Question</CModalTitle>
          </CModalHeader>
          <CModalBody mode="create">
            <CForm>
              <CFormLabel>Question</CFormLabel>
              <CFormInput></CFormInput>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={addQuestionHandler}>
              Add
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardHeader>
      <CCardBody>
        <CListGroup>
          {questions.map((question) => {
            return (
              <CListGroupItem
                key={question.serial_number}
                className="d-flex justify-content-between align-items-center dropzone"
                id={i++}
                draggable="true"
                onDragStart={dragStartHandler}
                onDragOver={dragOverHandler}
                onDrop={dropHandler}
              >
                <span>
                  <CIcon icon={cilMove} size="lg" />
                </span>
                <CFormTextarea
                  readOnly={true}
                  onClick={(event) => (event.target.readOnly = false)}
                  defaultValue={question.question}
                ></CFormTextarea>
                <span> </span>
                <CIcon icon={cilX} size="lg" />
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
