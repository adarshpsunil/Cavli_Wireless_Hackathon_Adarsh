import { useEffect } from "react";
import { Chart } from "highcharts";

const LineChart = (props) => {
  const { data } = props;
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;
    try {
      for (let i = 0; i < data.length; i++) {
        new Chart(`container${i}`, {
          type: "line",
          title: {
            text: "Sensory Values",
            align: "left",
          },
          subtitle: {
            text: "Sensory Values from uploaded JSON file",
            align: "left",
          },

          yAxis: {
            title: {
              text: "Sensory Values",
            },
          },
          xAxis: {
            title: {
              text: "Timestamp",
            },
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
          },
          plotOptions: {
            series: {
              label: {
                connectorAllowed: false,
              },
              pointStart: 0,
            },
          },
          series: [
            {
              name: data[i].tid,
              data: data[i].values,
            },
          ],
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 500,
                },
                chartOptions: {
                  legend: {
                    layout: "horizontal",
                    align: "center",
                    verticalAlign: "bottom",
                  },
                },
              },
            ],
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <div id="container0" style={{ width: `100%`, height: `400px` }}></div>
      <div id="container1" style={{ width: `100%`, height: `400px` }}></div>
      <div id="container2" style={{ width: `100%`, height: `400px` }}></div>
      <div id="container3" style={{ width: `100%`, height: `400px` }}></div>
      <div id="container4" style={{ width: `100%`, height: `400px` }}></div>
    </div>
  );
};

export default LineChart;
