import Chart from "./Chart";
import { PointOptionsObject, Options } from "highcharts"
import { count, Data, getUniqueValuesFromColumn } from "../lib";

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
        plotOptions: {
            pie: {
                innerSize: "50%",
                minSize: 150,
                borderColor: "rgba(0, 0, 0, 0.75)",
                borderWidth: 0.25,
                slicedOffset: 10,
                allowPointSelect: true,
            },
            series: {
                dataLabels: {
                    style: {
                        fontSize: "16px",
                        fontWeight: "400"
                    }
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