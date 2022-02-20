/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
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

const UserForm = (props) => {
  const [fullName, setFullName] = useState('')
  const [validfullName, validsetFullName] = useState('true')
  const [companyName, setCompanyName] = useState('')
  const [validcompanyName, validsetCompanyName] = useState('true')
  const [companyAddress, setCompanyAddress] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [validemail, validsetEmail] = useState('true')

  useEffect(() => {
    let newData = props.data
    setFullName(newData.user_full_name)
    setCompanyName(newData.company_name)
    setCompanyAddress(newData.company_addrs)

    setContactNumber(newData.contact)
    setEmail(newData.email)
  }, [props.data])
  const saveHandler = () => {
    validateForm()
    console.log(validfullName)
    if (validfullName && validcompanyName && validemail) return
    let payload = {
      user_full_name: fullName,
      company_name: companyName,
      company_addrs: companyAddress,
      contact: contactNumber,
      email: email,
    }
    payload = { ...props.data, ...payload }
    if (props.editMode) props.onUpdate(payload)
    else props.onDone(payload)
  }
  const validateForm = () => {
    //event.preventDefault()

    if (fullName.trim() === '') {
      validsetFullName(false)
      return
    }
    if (companyName.trim() === '') {
      validsetCompanyName(false)
      return
    }
    if (email.trim() === '') {
      validsetEmail(false)
      return
    }
  }
  return (
    <CModal alignment="center" visible={props.visible} onClose={props.onClose}>
      <CModalHeader>
        <CModalTitle>Enter the details to {props.editMode ? 'edit' : 'add'} the user</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel htmlFor="fullName">Full name</CFormLabel>
            <CFormInput
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
            {!validfullName && <p>Full name should not be empty</p>}
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="companyName">Company name</CFormLabel>
            <CFormInput
              type="text"
              placeholder="Company name"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
            />
            {!validcompanyName && <p>Company name should not be empty</p>}
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="companyAddress">Company address</CFormLabel>
            <CFormTextarea
              id="company address"
              rows="3"
              value={companyAddress}
              onChange={(event) => setCompanyAddress(event.target.value)}
            ></CFormTextarea>
          </div>

          <div className="mb-3">
            <CFormLabel htmlFor="contactno">Contact number</CFormLabel>
            <CFormInput
              type="text"
              placeholder="Contact number"
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <CFormLabel htmlFor="email">Email address</CFormLabel>
            <CFormInput
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {!validemail && <p>Email id should not be empty</p>}
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={props.onClose}>
          Close
        </CButton>
        <CButton color="primary" onClick={saveHandler}>
          {props.editMode ? 'Update' : 'Save'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
export default UserForm
