import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import axios from 'axios'
import { CChart } from '@coreui/react-chartjs'
import { CRow, CCol, CCard } from '@coreui/react'
import { CWidgetStatsB } from '@coreui/react'
import { cibStatuspage } from '@coreui/icons'

const Report = () => {
  const { id } = useParams()
  const [score, setScore] = useState('')
  const [status, setStatus] = useState('')

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
        xData.push(cat.question_category)
      })
      response.data.graph_perc.map((cat) => {
        yData.push(cat.percantage)
      })
      setScore(response.data.vri_score)
      setStatus(response.data.status)

      setX(xData)
      setY(yData)
    })
  }, [])

  return (
    <CCard>
      <CRow>
        <CCol xs={3}>
          <CWidgetStatsB className="mb-3" title="Report Date" value="89.9%" />
        </CCol>
        <CCol xs={2}>
          <CWidgetStatsB className="mb-3" color="info" title="VRI Score" value={score} />
        </CCol>
        <CCol xs={2}>
          <CWidgetStatsB className="mb-3" color="warning" title="Resilience Score" value={status} />
        </CCol>
        <CCol xs={2}>
          <CWidgetStatsB
            className="mb-3"
            color="secondary"
            title="Survey Respondents"
            value="89.9%"
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsB
            className="mb-3"
            color="secondary"
            title="Countdown to Survey close"
            value="89.9%"
          />
        </CCol>
      </CRow>
      <CChart
        type="bar"
        height="100vh"
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
