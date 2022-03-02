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
import React, { useState, useEffect } from 'react'

import { cilMove, cilX } from '@coreui/icons'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast from '../../components/Alert'

const Question = (props) => {
  const [visible, setVisible] = useState(false)
  const [question, setQuestion] = useState('')
  const [questions, setQuestions] = useState([])
  const [categoryName, setCategoryName] = useState('')
  // const categoryId = 1
  // const questions = data.filter((obj) => obj.category_id === categoryId)
  const { categoryId } = useParams()
  console.log(categoryId)
  const addQuestionHandler = () => {
    console.log('adding question')
    const payload = {
      question_name: question,
      category_name: categoryId,
    }
    axios({
      method: 'post',
      url: '/question_add',
      data: payload, // you are sending body instead
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setVisible(false)
          toast('Question created!', {
            position: toast.POSITION.TOP_CENTER,
            type: toast.TYPE.SUCCESS,
          })
          listQuestions()
        }
      })
      .catch((error) => {
        setVisible(false)
        toast('error adding category', {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.ERROR,
        })

        // take data from modal
        //add new object to questions
      })
  }
  useEffect(() => {
    console.log('listing questions(Question Component)')
    listQuestions()
  }, [])
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
  const listQuestions = () => {
    console.log(categoryId)
    axios({
      method: 'post',
      url: '/questions_load',
      data: {
        category_id: categoryId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setQuestions(response.data) //just iterrate this one ok
      })
      .catch((error) => {
        setVisible(false)
        toast('error fetching data', {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.ERROR,
        })
      })
  }
  return (
    <CCard>
      <CCardHeader>
        <CButton onClick={() => setVisible(!visible)}>+ Add Questions</CButton>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Add a new Question</CModalTitle>
          </CModalHeader>
          <CModalBody mode="create">
            <CForm>
              <CFormLabel>Question</CFormLabel>
              <CFormInput
                type="text"
                id="title"
                placeholder=" Question "
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
              ></CFormInput>
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
        <CFormLabel>Category Name</CFormLabel>
        <CFormInput
          type="text"
          id="title"
          placeholder="Category Name"
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
        ></CFormInput>
        <CListGroup>
          {questions.map((item) => {
            return (
              <CListGroupItem
                key={item.question_master_id}
                className="d-flex justify-content-between align-items-center dropzone"
                id={item.question_master_id}
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
                  defaultValue={item.question_name}
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
