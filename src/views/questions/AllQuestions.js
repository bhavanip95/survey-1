/* eslint-disable react/prop-types */
// eslint-disable-next-line prettier/prettier
import {
  CCard,
  CCardBody,
  CCardFooter,
  CFormTextarea,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilX } from '@coreui/icons'
import React from 'react'
const AllQuestions = ({ data, updateCallback, deleteCallback }) => {
  return (
    <>
      <CCard>
        <CCardBody>
          <CListGroup>
            {data.map((item) => {
              return (
                <CListGroupItem
                  key={item.question_master_id}
                  className="d-flex justify-content-between align-items-center dropzone"
                  id={item.question_master_id}
                >
                  <CFormTextarea
                    readOnly={true}
                    onClick={(event) => (event.target.readOnly = false)}
                    onChange={(event) =>
                      updateCallback(item.question_master_id, event.target.value)
                    }
                    defaultValue={item.question_name}
                  ></CFormTextarea>
                  <span> </span>
                  <CIcon
                    icon={cilX}
                    size="lg"
                    onClick={(event) => deleteCallback(item.question_master_id)}
                  />
                </CListGroupItem>
              )
            })}
          </CListGroup>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  )
}
export default AllQuestions
