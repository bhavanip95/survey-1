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
  CDropdownItem,
  CDropdownDivider,
  CDropdownMenu,
  CDropdownToggle,
  CDropdown,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSortAlphaDown } from '@coreui/icons'
import axios from 'axios'
import UserForm from './UserForm'
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
    axios({
      method: 'get',
      url: '/user_lists',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      setData(response.data)
    })
  }, [])

  const editUserHandler = (id) => {
    console.log(id)
    // axios({
    //   method: 'get',
    //   url: '/user_lists',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then((response) => {
    //   setData(response.data)
    // })
    let newState = {
      user_id: id,
      full_name: 'New Full Name',
      company_name: 'New Company Name',
      company_addrs: 'New Company Address',
      contact: '2222',
      email: 'test@test.com',
    }
    setFormData((prevData) => ({ ...prevData, ...newState }))
    setEditMode(true)
    setVisible(true)
  }
  const deleteUserHandler = (event) => {
    event.preventDefault()
    console.log('deleting user')
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
          alert('user created!')
        }
      })
      .catch((error) => {
        setVisible(false)
        alert('error adding user')
      })
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
        if (response.status === 201) {
          setVisible(false)
          alert('user updated!')
        }
      })
      .catch((error) => {
        setVisible(false)
        alert('error updating user')
      })
  }
  const addUserHandler = () => {
    setVisible(!visible)
    setEditMode(false)
  }
  const sortIcon = <CIcon className="me-2" icon={cilSortAlphaDown} size="sm" />
  const noData = <span>No Data</span>

  return (
    <CCard>
      <UserForm
        onClose={() => {
          setVisible(false)
        }}
        visible={visible}
        onDone={saveUserHandler}
        onUpdate={updateUserHandler}
        editMode={editMode}
        data={formData}
      />
      <CRow className="padding: 5px; margin: 5px;">
        <CCol xs={8}>
          <CFormInput id="exampleFormControlInput1" placeholder="Search FullName or CompanyName" />
        </CCol>
        <CCol xs={4}>
          <CButton onClick={addUserHandler}>Add User</CButton>
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
            <CTableHeaderCell>Actions</CTableHeaderCell>
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
                <div>{item.createdDate && noData}</div>
              </CTableDataCell>
              <CTableDataCell>
                <CDropdown variant="btn-group">
                  <CDropdownToggle color="primary">Action</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => editUserHandler(item.user_id)}>
                      Edit
                    </CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem onClick={deleteUserHandler}>Delete</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCard>
  )
}
export default Users
