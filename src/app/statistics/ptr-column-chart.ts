import { Chart } from "angular-highcharts";

export class PtrColumnChart {
  chart: Chart;

  constructor() {}

  getColumnChart(month: number, title: string, colors: string[]) {
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
          data: [
            {
              name: "Jan",
              y: month[0]
            },
            {
              name: "Feb",
              y: month[1]
            },
            {
              name: "Mar",
              y: month[2]
            },
            {
              name: "Apr",
              y: month[3]
            },
            {
              name: "May",
              y: month[4]
            },
            {
              name: "Jun",
              y: month[5]
            },
            {
              name: "Jul",
              y: month[6]
            },
            {
              name: "Aug",
              y: month[7]
            },
            {
              name: "Sep",
              y: month[8]
            },
            {
              name: "Oct",
              y: month[9]
            },
            {
              name: "Nov",
              y: month[10]
            },
            {
              name: "Dec",
              y: month[11]
            }
          ]
        }
      ]
    }));
  }
}
