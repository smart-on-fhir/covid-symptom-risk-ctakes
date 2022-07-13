import Chart from "./Chart";
import { SeriesColumnOptions } from "highcharts"
import { Data, getUniqueValuesFromColumn, relativeRisk } from "../lib";

export default function RelativeRiskChart({ data }: { data: Data })
{
    let symptoms = getUniqueValuesFromColumn(data, 'symptom_text').filter(s => s !== "no Sx covid");
    let counts = symptoms
        .map(symptom => relativeRisk(data, symptom) * 100)
    const options = {
        title: {
            text: 'Relative Risk of COVID Given Symptom'
        },
        subtitle: {
            text: 'Describe the input data here?'
        },
        xAxis: {
            categories: symptoms
        },
        series: [{
            name: 'Relative Risk',
            type: "column",
            data: counts
        } as SeriesColumnOptions]
    };

    return <Chart options={options} />
}