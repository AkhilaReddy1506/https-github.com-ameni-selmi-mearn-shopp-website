import { Typography } from '@mui/material';
import React from 'react'
import ReactApexChart from 'react-apexcharts'

function trigoSeries(cnt, strength) {
  var data = [];
  for (var i = 0; i < cnt; i++) {
      data.push((Math.sin(i / strength) * (i / strength) + i / strength+1) * (strength*2));
  }

  return data;
}
  
function UsersChart() {
    var colorPalette = ['#00D8B6','#008FFB',  '#FEB019', '#FF4560', '#775DD0']

    var options = {
      chart: {
        height: 340,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        stroke: {
          width: 4,
          curve: 'smooth'
        },
      },
      colors: colorPalette,
      series: [
        {
          name: "Day Time",
          data: trigoSeries(52, 20)
        },
        {
          name: "Night Time",
          data: trigoSeries(52, 27)
        },
      ],
      subtitle: {
        text: '168,215',
        align: 'center',
        margin: 30,
        offsetY: 40,
        style: {
          color: '#222',
          fontSize: '24px',
        }
      },
      markers: {
        size: 0
      },
      title: {
        text: 'Users insight',
        offsetX: 35,
        style: {
          fontSize: '20px',
          cssClass: 'apexcharts-yaxis-title'
        }
      },
      grid: {
    
      },
      xaxis: {
        labels: {
          show: false
        },
        axisTicks: {
          show: false
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        tickAmount: 2,
        labels: {
          show: false
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false
        },
        min: 0,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetY: -20,
        offsetX: -30
      }
    
    }
  return (
    <div id="chart" className='Card'>
        {/* <Typography variant="h5" color="text.secondary" paragraph>
          Users insight
        </Typography> */}
        <ReactApexChart options={options} series={options.series}  height={300} />
    </div>
  )
}

export default UsersChart