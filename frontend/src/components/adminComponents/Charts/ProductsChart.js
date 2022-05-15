import React from 'react'
import ReactApexChart from 'react-apexcharts'
import Typography from '@mui/material/Typography'



function ProductsChart() {
    const state = {
          
      series: [{
        name: 'Laptop',
        data: [44, 55, 41, 67, 22, 43]
      }, {
        name: 'Smartphone',
        data: [13, 23, 20, 8, 13, 27]
      }, {
        name: 'Monitor',
        data: [11, 17, 15, 15, 21, 14]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          },
        },
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2022 GMT', '01/02/2022 GMT', '01/03/2022 GMT', '01/04/2022 GMT',
            '01/05/2022 GMT', '01/06/2022 GMT'
          ],
        },
        title: {
          text: 'Products by category',
          offsetX: 35,
          style: {
            fontSize: '20px',
            cssClass: 'apexcharts-yaxis-title'
          }
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
    
  }

  return (
    <div id="chart" className='Card'>
        {/* <Typography variant="h5" color="text.secondary" paragraph>
          Products views by category
        </Typography> */}
    <ReactApexChart options={state.options} series={state.series} type="bar"  height={300} />
    </div>

  )
}

export default ProductsChart