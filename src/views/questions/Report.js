import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import axios from 'axios'
import { CChart } from '@coreui/react-chartjs'
import { CRow, CCol, CCard, CContainer } from '@coreui/react'
import { CWidgetStatsB } from '@coreui/react'
// eslint-disable-next-line no-unused-vars
import { cibStatuspage } from '@coreui/icons'

const Report = () => {
  const { id } = useParams()
  const [score, setScore] = useState('')
  const [status, setStatus] = useState('')
  const [respond, setRespond] = useState('')
  const [endDate, setEnddate] = useState('')

  const current = new Date()
  let shortMonth = current.toLocaleString('en-us', { month: 'short' })
  const date = `${shortMonth} ${''}  ${current.getFullYear()}`

  const [x, setX] = useState([])
  const [y, setY] = useState([])
  useEffect(function () {
    let payload = { survey_id: id }
    axios({
      method: 'post',
      url: '/survey_reports',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response.data)
      let xData = []
      let yData = []
      response.data.graph_category.map((cat) => {
        return xData.push(cat.question_category)
      })
      response.data.graph_perc.map((cat) => {
        return yData.push(cat.percantage)
      })
      setScore(response.data.vri_score)
      setStatus(response.data.status)
      setRespond(response.data.respond)
      setEnddate(response.data.survey_enddate)

      setX(xData)
      setY(yData)
    })
  }, [])

  return (
    <CCard>
      <CContainer>
        <CRow className="m-2 justify-content-center">
          <CCol xs={'auto'}>
            <CWidgetStatsB className="mb-3" title="Report Date" value={date} />
          </CCol>
          <CCol xs={'auto'}>
            <CWidgetStatsB className="mb-3" color="info" title="VRI Score" value={score} />
          </CCol>
          <CCol xs={'auto'}>
            <CWidgetStatsB
              className="mb-3"
              color="warning"
              title="Resilience Score"
              value={status}
            />
          </CCol>
          <CCol xs={'auto'}>
            <CWidgetStatsB
              className="mb-3"
              color="secondary"
              title="Survey Respondents"
              value={respond}
            />
          </CCol>
          <CCol xs={'auto'}>
            <CWidgetStatsB
              className="mb-3"
              color="secondary"
              title="Countdown to Survey close"
              value={endDate}
            />
          </CCol>
        </CRow>
      </CContainer>

      <CChart
        //style={{ width: '50rem', height: '24rem' }}
        type="bar"
        data={{
          labels: x,

          datasets: [
            {
              label: 'Survey Report',
              backgroundColor: '#035afc',
              data: y,
            },
          ],
        }}
        labels="months"
      />
    </CCard>
  )
}
export default Report
