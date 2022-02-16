import React, { useState } from 'react'

import {
  CCard,
  CButton,
  CModal,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CModalBody,
  CContainer,
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormTextarea,
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
const Users = () => {
  const [visible, setVisible] = useState(false)
  const tableExample = [
    {
      name: 'Bhavani Patil',
      companyName: 'Shriram Solutions',
      createdDate: 'Jan 1, 2021',
    },
  ]

  const editUserHandler = (event) => {
    event.preventDefault()
    console.log('editing user')
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
  const saveUserHandler = (event) => {
    event.preventDefault()
    let payload = {
      full_name: 'Bhavani Patil',
      company_name: 'Microsoft',
      company_addrs: 'Vijayapura',
      contact: '8908765431',
      email: 'bhavani@mail.com',
    }
    axios({
      method: 'post',
      url: 'https://vri.skjewelsonline.com/user_create',
      data: payload, // you are sending body instead
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }).then((response) => {
      console.log(response.data)
      console.log(response.status)
    })
  }
  const sortIcon = <CIcon className="me-2" icon={cilSortAlphaDown} size="sm" />
  return (
    <CCard>
      <CContainer>
        <CRow>
          <CCol xs={8}>
            <div className="p-3 m-0 border bg-light">
              <CFormInput
                id="exampleFormControlInput1"
                placeholder="Search FullName or CompanyName"
              />
            </div>
          </CCol>
          <CCol xs={4}>
            <div className="p-3 border bg-light align-center">
              <CButton onClick={() => setVisible(!visible)}>Add User</CButton>
              <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                  <CModalTitle>Enter the details to add user</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CForm>
                    <div className="mb-3">
                      <CFormLabel htmlFor="email">Full name</CFormLabel>
                      <CFormInput type="text" placeholder="Full Name" />
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="email">Company name</CFormLabel>
                      <CFormInput type="text" placeholder="Company name" />
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="company address">Company address</CFormLabel>
                      <CFormTextarea id="company address" rows="3"></CFormTextarea>
                    </div>

                    <div className="mb-3">
                      <CFormLabel htmlFor="contactno">Contact number</CFormLabel>
                      <CFormInput type="text" placeholder="Contact number" />
                    </div>

                    <div className="mb-3">
                      <CFormLabel htmlFor="email">Email address</CFormLabel>
                      <CFormInput type="email" id="email" placeholder="name@example.com" />
                    </div>
                  </CForm>
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                  </CButton>
                  <CButton color="primary" onClick={saveUserHandler}>
                    Save changes
                  </CButton>
                </CModalFooter>
              </CModal>
            </div>
          </CCol>
        </CRow>
      </CContainer>

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
          {tableExample.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell>
                <div>{item.name}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.companyName}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.createdDate}</div>
              </CTableDataCell>
              <CTableDataCell>
                <CDropdown variant="btn-group">
                  <CDropdownToggle color="primary">Action</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#" onClick={editUserHandler}>
                      Edit
                    </CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#" onClick={deleteUserHandler}>
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
