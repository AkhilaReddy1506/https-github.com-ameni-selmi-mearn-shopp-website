import { Typography } from '@mui/material'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

function VisitorsSources() {
    const state = {
          
        series: [44, 33, 54, 45],

        options: {
            labels: ["Facebook", "Instagram",  "LinkedIn", "Friends"],
            dataLabels: {
                enabled: false
            },
          chart: {
            width: 380,
            type: 'pie',
          },
          colors: ['#93C3EE', '#E5C6A0', '#669DB5', '#94A74A'],
          fill: {
            type: 'image',
            opacity: 0.95,
            image: {
               src: ['images/sm.png', 'images/sm.png', 'images/sm.png', 'images/sm.png'],
              width: 25,
              imagedHeight: 25
            },
          },
          stroke: {
            width: 4
          },
          title: {
            text: 'Visitors Source',
            offsetX: 35,
            style: {
              fontSize: '20px',
              cssClass: 'apexcharts-yaxis-title'
            }
          },
          dataLabels: {
            enabled: true,
            style: {
              colors: ['#111']
            },
            background: {
              enabled: true,
              foreColor: '#fff',
              borderWidth: 0
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },      
    }

  return (   
    <div id="chart" className='Card'>
        {/* <Typography variant="h5" color="text.secondary" paragraph>
            Visitors Source
        </Typography> */}
        <ReactApexChart options={state.options} series={state.series} type="pie" width={'90%'} />
    </div>
)
}

export default VisitorsSources