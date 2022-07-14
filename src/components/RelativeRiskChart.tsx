import Chart from "./Chart";
import {Options} from "highcharts"
import { Data, getUniqueValuesFromColumn, relativeRisk } from "../lib";
// Flip chart like no2, move colors (where possible), make axis bold 
export default function RelativeRiskChart({ data }: { data: Data })
{
    let symptoms = getUniqueValuesFromColumn(data, 'symptom_text').filter(s => s !== "no Sx covid");
    let counts = symptoms
        .map(symptom => relativeRisk(data, symptom) * 100)
    const options: Options = {
        title: {
            text: 'Relative Risk of COVID Given Symptom'
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
        
        plotOptions: {
            column: {
                showInLegend: false
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Relative Risk',
            type: "bar",
            data: counts
        }]
    };

    return <Chart options={options} />
}