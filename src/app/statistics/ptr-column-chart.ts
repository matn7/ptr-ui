import { Chart } from "angular-highcharts";

export class PtrColumnChart {
  chart: Chart;

  constructor() {}

  getColumnChart(month: Map<number, number>, title: string, colors: string[]) {
    console.log("getColumnChart: " + month);
    return (this.chart = new Chart({
      chart: {
        style: {
          fontFamily: "'Unica One', sans-serif"
        },
        type: "column"
      },
      title: {
        text: title,
        style: {
          fontWeight: "bold",
          fontSize: "14px"
        }
      },
      plotOptions: {
        column: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      credits: {
        enabled: false
      },
      subtitle: {
        style: {}
      },
      colors: [colors[0]],
      xAxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: "Percent (%)"
        },
        gridLineColor: "#ccc"
      },
      series: [
        {
          name: "Monthly average",
          type: "xrange",
          data: [
            {
              name: "Jan",
              y: month.get(1) ? month.get(1) : 0
            },
            {
              name: "Feb",
              y: month.get(2) ? month.get(2) : 0
            },
            {
              name: "Mar",
              y: month.get(3) ? month.get(3) : 0
            },
            {
              name: "Apr",
              y: month.get(4) ? month.get(4) : 0
            },
            {
              name: "May",
              y: month.get(5) ? month.get(5) : 0
            },
            {
              name: "Jun",
              y: month.get(6) ? month.get(6) : 0
            },
            {
              name: "Jul",
              y: month.get(7) ? month.get(7) : 0
            },
            {
              name: "Aug",
              y: month.get(8) ? month.get(8) : 0
            },
            {
              name: "Sep",
              y: month.get(9) ? month.get(9) : 0
            },
            {
              name: "Oct",
              y: month.get(10) ? month.get(10) : 0
            },
            {
              name: "Nov",
              y: month.get(11) ? month.get(11) : 0
            },
            {
              name: "Dec",
              y: month.get(12) ? month.get(12) : 0
            }
          ]
        }
      ]
    }));
  }

  getStartEndColumnChart(startEndData: Map<number, number>, title: string, colors: string[]) {
    console.log("getStartEndColumnChart: " + startEndData);
    console.log("getStartEndColumnChart: " + startEndData.get(1));

    return (this.chart = new Chart({
      chart: {
        style: {
          fontFamily: "'Unica One', sans-serif"
        },
        type: "column"
      },
      title: {
        text: title,
        style: {
          fontWeight: "bold",
          fontSize: "14px"
        }
      },
      plotOptions: {
        column: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      credits: {
        enabled: false
      },
      subtitle: {
        style: {}
      },
      colors: [colors[0]],
      xAxis: {
        categories: [
          "100",
          "75",
          "50",
          "25",
          "0"
        ],
        crosshair: true
      },
      yAxis: {
        title: {
          text: "Percent (%)"
        },
        gridLineColor: "#ccc"
      },
      series: [
        {
          name: "Start End combined",
          type: "xrange",
          data: [
            {
              name: "100",
              y: startEndData.get(0) ? startEndData.get(0) : 0
            },
            {
              name: "75",
              y: startEndData.get(1) ? startEndData.get(1) : 0
            },
            {
              name: "50",
              y: startEndData.get(2) ? startEndData.get(2) : 0
            },
            {
              name: "25",
              y: startEndData.get(3) ? startEndData.get(3) : 0
            },
            {
              name: "0",
              y: startEndData.get(4) ? startEndData.get(4) : 0
            }
          ]
        }
      ]
    }));
  }
}
