import React, { useState, useEffect } from 'react'

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
import CIcon from '@coreui/icons-react'
import { cilSortAlphaDown } from '@coreui/icons'
import axios from 'axios'
import UserForm from './UserForm'
import toast from '../../components/Alert'
// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// toast.configure()

const Users = () => {
  let initialState = {
    full_name: '',
    company_name: '',
    company_addrs: '',
    contact: '',
    email: '',
  }

  const [visible, setVisible] = useState(false)
  const [data, setData] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState(initialState)
  useEffect(() => {
    listUsers()
  }, [])

  const listUsers = () => {
    axios({
      method: 'get',
      url: '/user_lists',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      setData(response.data)
    })
  }
  const editUserHandler = (id) => {
    console.log(id)
    axios({
      method: 'post',
      url: '/user_edit',
      data: {
        user_id: id,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response.data[0])
      let userData = response.data[0]
      setFormData((prev) => {
        return { ...prev, ...userData }
      })
    })
    // let existingData = data.filter((elem) => {
    //   return elem.user_id === id
    // })
    // let editData = existingData[0]
    // setFormData((prevData) => ({ ...prevData, ...editData }))
    setEditMode(true)
    setVisible(true)
  }
  const deleteUserHandler = (id) => {
    console.log('deleting user' + id)
    axios({
      method: 'post',
      url: '/user_delete',
      data: {
        user_id: id,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      toast('user deleted!!', {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.INFO,
      })
      listUsers()
    })
  }
  const sortByNameHandler = () => {
    console.log('sort by name handler')
  }
  const sortByCreatedDateHandler = () => {
    console.log('sort by created date handler')
  }
  const sortByCompnayNameHandler = () => {
    console.log('sort by company name handler')
  }
  const saveUserHandler = (payload) => {
    axios({
      method: 'post',
      url: '/user_create',
      data: payload, // you are sending body instead
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setVisible(false)
          toast('user created!', {
            position: toast.POSITION.TOP_CENTER,
            type: toast.TYPE.SUCCESS,
          })
          listUsers()
        }
      })
      .catch((error) => {
        setVisible(false)
        toast('error adding user')
      })
    setFormData(initialState)
  }

  const updateUserHandler = (payload) => {
    console.log('updating user Id ' + payload.user_id)
    axios({
      method: 'post',
      url: '/user_update',
      data: payload, // you are sending body instead
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.data.status === 201) {
          setVisible(false)
          toast('user updated!', {
            position: toast.POSITION.TOP_CENTER,
            type: toast.TYPE.DEFAULT,
          })
          listUsers()
        }
      })
      .catch((error) => {
        setVisible(false)
        toast('error updating user', {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.ERROR,
        })
      })
    setFormData(initialState)
  }
  const addUserHandler = () => {
    setVisible(!visible)
    setEditMode(false)
  }
  const searchHandler = (i) => {
    console.log(i)
    let searchData = data.filter((user) => {
      if (user.company_name.includes(i) || user.user_full_name.includes(i)) return user
    })
    console.log(searchData)
    setData((prev) => searchData)
  }
  const sortIcon = <CIcon className="me-2" icon={cilSortAlphaDown} size="sm" />
  return (
    <CCard style={{ minHeight: '50vh' }}>
      <UserForm
        onClose={() => {
          setVisible(false)
          setFormData(initialState)
        }}
        visible={visible}
        onDone={saveUserHandler}
        onUpdate={updateUserHandler}
        editMode={editMode}
        data={formData}
      />
      <CRow className="p-3 m-0 border bg-light">
        <CCol xs={8}>
          <CFormInput
            id="exampleFormControlInput1"
            placeholder="Search FullName or CompanyName"
            onChange={(event) => searchHandler(event.target.value)}
          />
        </CCol>
        <CCol xs={4} className="text-center">
          <CButton size="lg" onClick={addUserHandler}>
            Add User
          </CButton>
        </CCol>
      </CRow>

      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell onClick={sortByNameHandler}>
              Full Name
              {sortIcon}
            </CTableHeaderCell>
            <CTableHeaderCell onClick={sortByCompnayNameHandler}>
              Company Name
              {sortIcon}
            </CTableHeaderCell>
            <CTableHeaderCell onClick={sortByCreatedDateHandler}>
              Created Date
              {sortIcon}
            </CTableHeaderCell>
            {/* <CTableHeaderCell colSpan="2">Actions</CTableHeaderCell> */}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((item) => (
            <CTableRow v-for="item in tableItems" key={item.user_id}>
              <CTableDataCell>
                <div>{item.user_full_name}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.company_name}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.company_created_date}</div>
              </CTableDataCell>
              <CTableDataCell colSpan="2" className="text-center">
                <CRow>
                  <CCol>
                    <CButton color="secondary" onClick={() => editUserHandler(item.user_id)}>
                      {' '}
                      Edit
                    </CButton>
                  </CCol>
                  <CCol>
                    <CButton color="danger" onClick={() => deleteUserHandler(item.user_id)}>
                      Delete
                    </CButton>
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
export default Users
