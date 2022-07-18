import Chart from "./Chart";
import {Options} from "highcharts"
import { Data, getUniqueValuesFromColumn, relativeRisk, probability} from "../lib";
import "./RelativeRiskChart";
// import {computeColor} from "./ProbabilityChart";

export default function ComparisonChart({ data }: { data: Data })
{
    let symptoms = getUniqueValuesFromColumn(data, 'symptom_text').filter(s => s !== "no Sx covid");
    let countsRR = symptoms
        .map(symptom => relativeRisk(data, symptom) * 100)
    let counts = symptoms.map(symptom => ({
        y: probability(data, { symptom_text: symptom }) * 100,
        // color: computeColor(probability(data, { symptom_text: symptom }) * 100)
    }))
  // rgb(99 179 222) = light blue
    // rgb(65 113 163) = dark blue 
const options: Options = {
    colorAxis: {
        min: 0,
        max: 50, 
        minColor: "rgb(99, 179, 222)",
        maxColor: "rgb(65, 113, 163)",
    },
    title: {
        text: "<b> Relative Risk vs Probability </b>",
        style: {
            fontSize: "26px",
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
            },
        },
        startOnTick: true,
        endOnTick: true, 

    },
    yAxis: {
        title: {
            text: "<b> Percentages (%) </b>",
            style: {
                fontSize: "14px"
            },
        },
        endOnTick: false,
        gridLineDashStyle: "ShortDash",
        lineColor: "#888888",
        lineWidth: 1,

    },
    // tooltip: {
    //     pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
    // },
    plotOptions: {
        area: {
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        },
        series: {
            borderColor: "rgba(0,0,0,0.75)",
            borderWidth: 0.25,
        }
    },
    series: [{
            name: 'Relative Risk',
            data: countsRR,
            type: "column",
            showInLegend: true,
            
    }, {
            name: 'Probability',
            data: counts,
            type: "spline",
            colorAxis: false,
            color: '#EAA0A0'
    }
    ],
    credits: {
        enabled: false
    },
    }
   return <Chart options={options} />
}
 