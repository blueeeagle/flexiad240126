import {useEffect, useRef , FC} from 'react';
import { PageTitle } from '../../../_metronic/layout/core';
import ApexCharts, {ApexOptions} from 'apexcharts';
import { getCSS,  getCSSVariableValue } from '../../../_metronic/assets/ts/_utils';
import { useThemeMode } from '../../../_metronic/partials';

function ordersOptions(height: number): ApexOptions {
    const labelColor = getCSSVariableValue('--bs-gray-500')
    const borderColor = getCSSVariableValue('--bs-gray-200')
  
    const baseColor = getCSSVariableValue('--bs-primary')
    const baseLightColor = getCSSVariableValue('--bs-primary-light')
    const secondaryColor = getCSSVariableValue('--bs-info')
  
    return {
      series: [
        {
          name: 'Net Profit',
          type: 'bar',
          data: [40, 50, 65, 70, 50, 30],
        },
        {
          name: 'Revenue',
          type: 'bar',
          data: [20, 20, 25, 30, 30, 20],
        },
      ],
      chart: {
        fontFamily: 'inherit',
        stacked: true,
        height: height,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 5,
          columnWidth: '12%',
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        max: 120,
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      fill: {
        opacity: 1,
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: '12px',
        },
        y: {
          formatter: function (val) {
            return '$' + val + ' thousands'
          },
        },
      },
      colors: [baseColor, secondaryColor, baseLightColor],
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
    }
}


function RevenueOptions(height: number): ApexOptions {
    return {
    series: [
        {
          name: "High - 2013",
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "Low - 2013",
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ],
    
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          title: {
            text: 'X'
          }
        },
        yaxis: {
          title: {
            text: 'Y'
          },
          min: 5,
          max: 40
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      
    
    };
    

}


  

const AgentStatistics : FC = () => {
    const orderRef = useRef<HTMLDivElement | null>(null);
    const revenueRef = useRef<HTMLDivElement | null>(null);

    const {mode} = useThemeMode();


    const refreshChart = () => {
      if (!orderRef.current) {
        return
      }
      const height = parseInt(getCSS(orderRef.current, 'height'))
  
      const chart = new ApexCharts(orderRef.current, ordersOptions(height))
      if (chart) {
        chart.render()
      }
  
      return chart
    }

    const revenueChart = () => {
        if (!revenueRef.current) {
          return
        }
        const height = parseInt(getCSS(revenueRef.current, 'height'))
    
        const chart = new ApexCharts(revenueRef.current, RevenueOptions(height))
        if (chart) {
          chart.render()
        }
    
        return chart
      }

    useEffect(() => {
        const chart = refreshChart()
        const revenue = revenueChart()
    
        return () => {
          if (chart) {
            chart.destroy()
          }
        }
      }, [orderRef, revenueRef, mode])   

    return(
        <>
             <PageTitle>STATS</PageTitle>
             <div className='row g-5 col-xl-12'>
                <div className={`col-md-6`}>
                    <div className={`card `}>
                        <div className='card-header border-0 pt-5'>
                            <h3 className='card-title align-items-start flex-column'>
                                <span className='card-label fw-bold fs-3 mb-1'>Recent Orders</span>

                            </h3>

                            <div className='card-toolbar' data-kt-buttons='true'>
                                <a className='btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1'
                                    id='kt_charts_widget_6_sales_btn'>ONLINE ORDERS</a>

                                <a className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1' id='kt_charts_widget_6_expenses_btn'>
                                    POS ORDERS
                                </a>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div ref={orderRef} id='kt_charts_widget_6_chart' style={{ height: '350px' }}></div>
                        </div>
                    </div>
                </div>

                <div className={`col-md-6`}>
                    <div className={`card `}>
                        <div className='card-header border-0 pt-5'>
                            <h3 className='card-title align-items-start flex-column'>
                                <span className='card-label fw-bold fs-3 mb-1'>Recent Orders</span>

                            </h3>

                            <div className='card-toolbar' data-kt-buttons='true'>
                                <a className='btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1'
                                    id='kt_charts_widget_6_sales_btn'>SEARCH</a>

                                <a className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1' id='kt_charts_widget_6_expenses_btn'>
                                    RESET
                                </a>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div ref={revenueRef} id='kt_charts_widget_6_chart' style={{ height: '350px' }}></div>
                        </div>
                    </div>
                </div> 

            </div>
        </>
    )
}

export default AgentStatistics;