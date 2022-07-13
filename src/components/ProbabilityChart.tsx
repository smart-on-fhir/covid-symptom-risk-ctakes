import Chart from "./Chart";
import { SeriesBarOptions } from "highcharts"
import { Data, getUniqueValuesFromColumn, probability } from "../lib";

export default function RelativeRiskChart({ data }: { data: Data })
{
    let symptoms = getUniqueValuesFromColumn(data, 'symptom_text')
    let counts = symptoms.map(symptom => probability(data, { symptom_text: symptom }))
    const options = {
        title: {
            text: 'Probability of Symptom'
        },
        subtitle: {
            text: 'Describe the input data here?'
        },
        xAxis: {
            categories: symptoms
        },
        series: [{
            name: 'Probability',
            type: "bar",
            data: counts
        } as SeriesBarOptions]
    };

    return <Chart options={options} />
}