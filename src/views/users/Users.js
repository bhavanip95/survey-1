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
      alert('user deleted!!')
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
          alert('user created!')
          listUsers()
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
          listUsers()
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
      <CRow className="p-3 m-0 border bg-light">
        <CCol xs={8}>
          <CFormInput id="exampleFormControlInput1" placeholder="Search FullName or CompanyName" />
        </CCol>
        <CCol xs={4} text-center>
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
                <div>{item.company_created_date}</div>
              </CTableDataCell>
              <CTableDataCell>
                <CDropdown variant="btn-group">
                  <CDropdownToggle color="info">Action</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => editUserHandler(item.user_id)}>
                      Edit
                    </CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem onClick={() => deleteUserHandler(item.user_id)}>
                      Delete
                    </CDropdownItem>
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
