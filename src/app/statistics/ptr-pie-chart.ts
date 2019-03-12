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
              y: num[0]
            },
            {
              name: "75%",
              y: num[1]
            },
            {
              name: "50%",
              y: num[2]
            },
            {
              name: "25%",
              y: num[3]
            },
            {
              name: "0%",
              y: num[4]
            }
          ]
        }
      ]
    }));
  }
}
