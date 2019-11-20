import { Chart } from "angular-highcharts";

export class PtrDaysColumnChart {
  chart: Chart;
  daysData: Array<number>;

  constructor() {}

  getColumnChart(
    month: number,
    title: string,
    colors: string[],
    weekday: Array<string>
  ) {
    this.daysData = Array(weekday.length)
      .fill(0)
      .map((x, i) => month[i]);

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
        categories: weekday,
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
          name: "Daily average",
          type: "map",
          data: this.daysData
        }
      ]
    }));
  }
}
