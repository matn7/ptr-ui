import { Chart } from "angular-highcharts";

export class PtrPieChart {
  chart: Chart;

  constructor() {}

  getPieChart(num: number, title: string, colors: string[]) {
    return (this.chart = new Chart({
      chart: {
        style: {
          fontFamily: "'Unica One', sans-serif"
        },
        plotBorderColor: "#606063",
        type: "pie"
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      title: {
        text: title,
        style: {
          fontWeight: "bold",
          fontSize: "14px"
        }
      },
      credits: {
        enabled: false
      },
      colors: colors,
      series: [
        {
          name: "Task1",
          data: [
            {
              name: "100%",
              y: num[100] ? num[100] : 0
            },
            {
              name: "75%",
              y: num[75] ? num[75] : 0
            },
            {
              name: "50%",
              y: num[50] ? num[50] : 0
            },
            {
              name: "25%",
              y: num[25] ? num[25] : 0
            },
            {
              name: "0%",
              y: num[0] ? num[0] : 0
            }
          ]
        }
      ]
    }));
  }
}
