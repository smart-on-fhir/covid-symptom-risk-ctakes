import Chart from "./Chart";
import { Options } from "highcharts"
import { Data, getUniqueValuesFromColumn, probability } from "../lib";

export default function RelativeRiskChart({ data }: { data: Data })
{
    let symptoms = getUniqueValuesFromColumn(data, 'symptom_text').filter(s => s !== "no Sx covid");
    let counts = symptoms.map(symptom => probability(data, { symptom_text: symptom }) * 100)
    const options:  Options = {
        title: {
            text: '<b> Probability of Symptom </b>',
        },
        subtitle: {
            text: 'Describe the input data here?'
        },
        xAxis: {
            categories: symptoms,
            lineColor: "#888888",
            zIndex: 2300,
            labels: {
                style: {
                    fontWeight: 'bold'
                }
            }
        },
        yAxis: {
            title: {
                text: "<b> Probability (%) </b>"
            },
            endOnTick: false,
            gridLineDashStyle: "ShortDash",
            lineColor: "#888888",
            lineWidth: 1,

        },
        series: [{
            name: 'Probability',
            type: "bar",
            data: counts,
            showInLegend: false,
            color: "#4477BB",
        }],
        tooltip: {
            pointFormat: "Probability: {point.y:.2f}",
            headerFormat: ' <b> {point.x} </b> <br/>' 
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderColor: "rgba(0,0,0,0.75)",
                borderWidth: 0.25,
            }
        }
    };

    return <Chart options={options} />
}