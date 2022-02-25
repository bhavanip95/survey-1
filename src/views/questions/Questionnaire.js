import {
  CButton,
  CButtonGroup,
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
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilX, cilPencil } from '@coreui/icons'

const Questionnaire = () => {
  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState([])
  useEffect(() => {
    listCategories()
  }, [])

  const listCategories = () => {
    axios({
      method: 'get',
      url: '/category_list',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      setCategories(response.data)
    })
  }
  const saveCategoryHandler = () => {
    console.log('saving category')
    const payload = {
      question_category: title,
    }
    axios({
      method: 'post',
      url: '/category_add',
      data: payload, // you are sending body instead
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setVisible(false)
          alert('Category created!')
          listCategories()
        }
      })
      .catch((error) => {
        setVisible(false)
        alert('error adding category')
      })
  }
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const questionnaireClickedHandler = (categoryId) => {
    history.push('questionnaire/edit/' + categoryId)
    /*console.log(categoryId)
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
        console.log(response.data) //just iterrate this one ok
      })
      .catch((error) => {
        setVisible(false)
        alert('error fetching data')
      })*/
  }
  const deleteCategoryHandler = (categoryId) => {
    console.log(categoryId)
    let payload = {
      category_id: categoryId,
    }
    axios({
      method: 'post',
      url: '/category_delete',
      data: payload, // you are sending body instead
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setVisible(false)
          alert('Category deleted!')
          listCategories()
        }
      })
      .catch((error) => {
        setVisible(false)
        alert('error deleting category')
      })
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
                <CFormInput
                  type="text"
                  id="title"
                  placeholder="Category Title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                ></CFormInput>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton color="primary" onClick={saveCategoryHandler}>
                Add
              </CButton>
            </CModalFooter>
          </CModal>
        </CCardHeader>
        <CCardBody>
          <CListGroup>
            {categories.map((item) => {
              return (
                <CListGroupItem
                  className="d-flex justify-content-between align-items-center"
                  key={item.question_bank_id}
                  component="a"
                >
                  {item.question_bank_title}
                  <div>
                    <CBadge color="info">10</CBadge>
                    <span> </span>

                    <CButtonGroup role="group" aria-label="Basic example">
                      <CButton color="secondary">
                        <CIcon
                          icon={cilX}
                          size="lg"
                          onClick={() => {
                            deleteCategoryHandler(item.question_bank_id)
                          }}
                        />
                      </CButton>
                      <CButton color="dark">
                        <CIcon
                          icon={cilPencil}
                          size="lg"
                          onClick={() => {
                            questionnaireClickedHandler(item.question_bank_id)
                          }}
                        />
                      </CButton>
                    </CButtonGroup>
                  </div>
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
