import Chart from "./Chart";
import {Options} from "highcharts"
import { Data, getUniqueValuesFromColumn, relativeRisk } from "../lib";

// Flip chart like no2, move colors (where possible), make axis bold 
export default function RelativeRiskChart({ data }: { data: Data })
{
    let symptoms = getUniqueValuesFromColumn(data, 'symptom_text').filter(s => s !== "no Sx covid");
    let counts = symptoms
        .map(symptom => relativeRisk(data, symptom))
        // color: computeColor(relativeRisk(data, {symptom_text : symptoms }) ) - commented as having issues w this line
    const options: Options = {
        title: {
            text: '<b>Relative Risk of symptom given COVID positive</b>',
            style: {
                fontSize: "26px"
            }
        },
        // subtitle: {
        //     text: "Relative Risk of having COVID-19, given the symptoms present",
        //     style: {
        //         fontSize: "18px"
        //     },
        // },
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
        tooltip: {
            pointFormat: "Relative Risk: {point.y:.2f}",
            headerFormat: ' <b> {point.x} </b> <br/>' 
        },
        yAxis: {
            title: {
                text: "<b> Relative Risk </b>",
                style: {
                    fontSize: "14px"
                },
            },
            endOnTick: false,
            gridLineDashStyle: "ShortDash",
            lineColor: "#888888",
            lineWidth: 1,
        },
        plotOptions: {
            column: {
                showInLegend: false
            },
            series: {
            borderColor: "rgba(0,0,0,0.75)",
            borderWidth: 0.25,
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Relative Risk',
            type: "bar",
            data: counts,
            showInLegend: false,
        }]
    };

    return <Chart options={options} />
}