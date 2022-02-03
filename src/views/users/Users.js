import React from 'react'

import {
  CCard,
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
const Users = () => {
  const tableExample = [
    {
      name: 'Bhavani Patil',
      companyName: 'Shriram Solutions',
      createdDate: 'Jan 1, 2021',
    },
    {
      name: 'Bhavani Patil',
      companyName: 'Shriram Solutions',
      createdDate: 'Jan 1, 2021',
    },
    {
      name: 'Bhavani Patil',
      companyName: 'Shriram Solutions',
      createdDate: 'Jan 1, 2021',
    },
    {
      name: 'Bhavani Patil',
      companyName: 'Shriram Solutions',
      createdDate: 'Jan 1, 2021',
    },
    {
      name: 'Bhavani Patil',
      companyName: 'Shriram Solutions',
      createdDate: 'Jan 1, 2021',
    },
    {
      name: 'Bhavani Patil',
      companyName: 'Shriram Solutions',
      createdDate: 'Jan 1, 2021',
    },
    {
      name: 'Bhavani Patil',
      companyName: 'Shriram Solutions',
      createdDate: 'Jan 1, 2021',
    },
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
  const sortIcon = <CIcon className="me-2" icon={cilSortAlphaDown} size="sm" />
  return (
    <CCard>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell onClick={sortByNameHandler}>
              Name
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
