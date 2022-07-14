import Chart from "./Chart";
import { PointOptionsObject, Options } from "highcharts"
import { count, Data, getUniqueValuesFromColumn } from "../lib";

const COLORS = [
    "#CC0000",
    "#DD9966",
    "#FFCC33",
    "#AAAA00",
    "#CC6666",
    "#DD99FF",
    "#9999FF",
    "#7777BB",
    "#4477BB",
    "#339999",
    "#339933"
]

export default function SymptomChart({ data }: { data: Data })
{
    let symptoms = getUniqueValuesFromColumn(data, 'symptom_text')
        .filter(s => s !== "no Sx covid")    
        .sort();

    let seriesData: PointOptionsObject[] = symptoms.map(symptom => ({
        name: symptom,
        y: count(data, { symptom_text: symptom })
    }))

    const options: Options = {
        colors: COLORS,

        plotOptions: {
            pie: {
                innerSize: "50%",
                // minSize: 150,
                borderColor: "rgba(0, 0, 0, 0.75)",
                borderWidth: 0.25,
                slicedOffset: 10,
                allowPointSelect: true,
            },
            series: {
                dataLabels: {
                    style: {
                        fontSize: "14px",
                        fontWeight: "400"
                    },
                    overflow: "allow",
                    padding: 0,
                    defer: true,
                    color: "#444444"
                }
            }
        },
        title: {
            text: 'Covid related symptoms',
            style: {
                fontSize: "26px"
            }
        },
        subtitle: {
            text: 'Put something here?',
            style: {
                fontSize: "18px"
            }
        },
        series: [{
            name: "Number of Patients",
            type: "pie",
            data: seriesData
        }],
    credits: {
        enabled: false
    },
    };

    return <Chart options={options} />
}