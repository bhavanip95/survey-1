/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CRow, CCol } from '@coreui/react'

const Datepicker = () => {
  //.toISOString().split('T')[0] + ' ' + new Date().toISOString().split('T')[1]
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [convertstartDate, setConvertStartDate] = useState()
  const [convertendDate, setConvertEndDate] = useState()

  useEffect(() => {
    setConvertStartDate(startDate.toISOString().split('T')[0])
    setConvertEndDate(endDate.toISOString().split('T')[0])
  }, [])

  console.log(convertstartDate)
  console.log(convertendDate)
  //let yourDate = new Date()

  return (
    <>
      <CRow className="p-3 m-3 border bg-light">
        <CCol xs={6}>
          <label>survey Start date</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
          />
        </CCol>

        <CCol xs={6}>
          <label>survey End date</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </CCol>
      </CRow>
    </>
  )
}
export default Datepicker
