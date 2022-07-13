import Chart from "./Chart";
import { PointOptionsObject, Options } from "highcharts"
import { count, Data, getUniqueValuesFromColumn } from "../lib";

const COLORS = [
    "#CC0000",
    "#DDAA55",
    "#FFCC33",
    "#BBBB00",
    "#EE8844",
    "#DD99EE",
    "#9999FF",
    "#7777FF",
    "#55AAFF",
    "#00CCBB",
    "#009900"
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
                minSize: 100,
                borderColor: "rgba(0, 0, 0, 0.75)",
                borderWidth: 0.25,
                slicedOffset: 10,
                allowPointSelect: true,
                center: ["50%", "50%"],
                startAngle: 236,
                dataLabels: {
                    connectorPadding: 2,
                    crookDistance: "20em",
                    distance: "15%",
                    padding: 5,
                    color: "#444444",
                    style: {
                        fontSize: "14px",
                        fontWeight: "400"
                    },
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
        }]
    };

    return <Chart options={options} />
}