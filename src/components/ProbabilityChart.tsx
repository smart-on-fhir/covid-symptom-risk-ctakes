import Chart from "./Chart";
import { Options } from "highcharts"
import { Data, getUniqueValuesFromColumn, probability } from "../lib";


export function computeColor(n: number){
    let q = n/30
    let c = q * 230
    let value = `rgb(${c},${255-c},0)`

    return value 
}

export default function RelativeRiskChart({ data }: { data: Data })
{
    let symptoms = getUniqueValuesFromColumn(data, 'symptom_text').filter(s => s !== "no Sx covid");
    let counts = symptoms.map(symptom => ({
        y: probability(data, { symptom_text: symptom }) * 100,
        color: computeColor(probability(data, { symptom_text: symptom }) * 100)
    }))
    const options:  Options = {
        title: {
            text: '<b>Prevalence of Symptom</b>',
            style: {
                fontSize: "26px"
            }
        },
        subtitle: {
            text: "Prevalence of each symptom for patients presenting to ED from 2020-2022",
            style: {
                fontSize: "18px"
            },
        },
        xAxis: {
            categories: symptoms,
            lineColor: "#888888",
            zIndex: 2300,
            labels: {
                style: {
                    fontWeight: '400',
                    fontSize: "14px", 
                }
            }
        },
        yAxis: {
            title: {
                text: "<b> Prevalence (%) </b>",
                style: {
                    fontSize: "14px"
                },
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
           // color: "#4477BB",
        }],
        tooltip: {
            pointFormat: "Prevalence: {point.y:.2f} %",
            headerFormat: ' <b> {point.x} </b> <br/>',
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