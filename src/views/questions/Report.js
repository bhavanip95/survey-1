import React, { useEffect, useState } from 'react'
import { CChart } from '@coreui/react-chartjs'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Report = () => {
  const { id } = useParams()
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
      let xData = []
      let yData = []
      response.data.map((elem) => {
        xData.push(elem.question_category)
        yData.push(elem.percantage)
      })
      setX(xData)
      setY(yData)
    })
  }, [])

  return (
    <CChart
      type="bar"
      data={{
        labels: x,
        datasets: [
          {
            label: 'Survey Reportgi',
            backgroundColor: '#f87979',
            data: y,
          },
        ],
      }}
      labels="months"
    />
  )
}
export default Report
