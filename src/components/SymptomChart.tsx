import Chart from "./Chart";
import { SeriesPieOptions } from "highcharts"
import { count, Data, getUniqueValuesFromColumn } from "../lib";

export default function SymptomChart({ data }: { data: Data })
{
    let symptoms = getUniqueValuesFromColumn(data, 'symptom_text')
    let seriesData = symptoms.map(symptom => ({
        name: symptom,
        y: count(data, { symptom_text: symptom })
    }))
    const options = {
        title: {
            text: 'Covid related symptoms'
        },
        subtitle: {
            text: 'Put something here?'
        },
        series: [{
            name: "Number of Patients",
            type: "pie",
            data: seriesData
        } as SeriesPieOptions]
    };

    return <Chart options={options} />
}