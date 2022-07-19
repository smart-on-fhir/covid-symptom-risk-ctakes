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
    "#00AA00"
]

export default function SymptomChart({ data, className}: { data: Data, className?: string })
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
                    connectorPadding: 5,
                    crookDistance: "20em",
                    distance: "25%",
                    padding: 0,
                    color: "#444444",
                    style: {
                        fontSize: "14px",
                        fontWeight: "400",
                        // padding: "0 5px",
                        // width: 100,
                        // position: "absolute",
                        // top: "-20px"
                    },
                }
            }
        },
        title: {
            text: '<b> Covid Related symptoms </b>',
            style: {
                fontSize: "26px"
            }
        },
        subtitle: {
            text: 'Distribution of symptoms across patients diagnosed with COVID-19',
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
    let x = "chart"+(className? " " +className: "")
    // return <div ref={this.container} className={x}/>
    return <Chart options={options} className={x}/>
}