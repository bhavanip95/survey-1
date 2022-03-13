import {
  CButton,
  CButtonGroup,
  CCard,
  CRow,
  CTable,
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
  CCol,
} from '@coreui/react'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilX, cilPencil } from '@coreui/icons'
import toast from '../../components/Alert'

const Questionnaire = () => {
  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState([])
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [categoryId, setCategoryId] = useState('')

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
    if (isEditMode) payload.category_id = categoryId
    axios({
      method: 'post',
      url: isEditMode ? '/category_update' : '/category_add',
      data: payload, // you are sending body instead
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setVisible(false)
          let message = isEditMode ? 'Category Updated' : 'Category created!'
          toast(message, {
            position: toast.POSITION.TOP_CENTER,
            type: toast.TYPE.SUCCESS,
          })
          listCategories()
          setTitle('')
        }
      })
      .catch((error) => {
        setVisible(false)
        toast('error adding category', {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.ERROR,
        })
      })
  }
  const questionnaireClickedHandler = (categoryId) => {
    history.push('questionnaire/edit/' + categoryId)
  }

  const editCategoryHandler = (id) => {
    setVisible(true)

    setIsEditMode(true)
    setCategoryId(id)
    let catObj = categories.filter((cat) => cat.question_bank_id === id)
    setTitle(catObj[0].question_bank_title)
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
          toast('Category deleted!', {
            position: toast.POSITION.TOP_CENTER,
            type: toast.TYPE.INFO,
          })
          listCategories()
        }
      })
      .catch((error) => {
        setVisible(false)
        toast('error deleting category', {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.ERROR,
        })
      })
  }
  return (
    <div>
      <CCard>
        <CCardHeader className="align-self-end">
          <CButton size="lg" onClick={() => setVisible(!visible)}>
            + Add Category
          </CButton>

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
                {isEditMode ? 'Update' : 'Add'}
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
                  onClick={() => {
                    questionnaireClickedHandler(item.question_bank_id)
                  }}
                >
                  {item.question_bank_title}
                  <div>
                    <CButtonGroup className="align-self-end">
                      <CButton color="secondary">
                        <CIcon
                          icon={cilX}
                          size="lg"
                          onClick={(event) => {
                            event.stopPropagation()
                            deleteCategoryHandler(item.question_bank_id)
                          }}
                        />
                      </CButton>
                      <CButton color="dark">
                        <CIcon
                          icon={cilPencil}
                          size="lg"
                          onClick={(event) => {
                            event.stopPropagation()
                            editCategoryHandler(item.question_bank_id)
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
