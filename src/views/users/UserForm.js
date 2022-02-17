/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CModalBody,
  CForm,
  CFormLabel,
  CFormTextarea,
  CFormInput,
} from '@coreui/react'

const UserForm = ({ visible, onClose, onDone, mode }) => {
  const fullName = useRef('')
  const companyName = useRef('')
  const companyAddress = useRef('')
  const contactNumber = useRef('')
  const email = useRef('')

  const saveHandler = () => {
    let payload = {
      full_name: fullName.current.value,
      company_name: companyName.current.value,
      company_addrs: companyAddress.current.value,
      contact: contactNumber.current.value,
      email: email.current.value,
    }
    onDone(payload)
  }
  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Enter the details to add user</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel htmlFor="fullName">Full name</CFormLabel>
            <CFormInput type="text" placeholder="Full Name" ref={fullName} />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="companyName">Company name</CFormLabel>
            <CFormInput type="text" placeholder="Company name" ref={companyName} />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="companyAddress">Company address</CFormLabel>
            <CFormTextarea id="company address" rows="3" ref={companyAddress}></CFormTextarea>
          </div>

          <div className="mb-3">
            <CFormLabel htmlFor="contactno">Contact number</CFormLabel>
            <CFormInput type="text" placeholder="Contact number" ref={contactNumber} />
          </div>

          <div className="mb-3">
            <CFormLabel htmlFor="email">Email address</CFormLabel>
            <CFormInput type="email" id="email" placeholder="name@example.com" ref={email} />
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
        <CButton color="primary" onClick={saveHandler}>
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
export default UserForm
