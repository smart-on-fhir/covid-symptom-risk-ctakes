import { useEffect, useState } from "react";
import { Data, parseCSV } from "../lib";
import ProbabilityChart from "./ProbabilityChart";
import RelativeRiskChart from "./RelativeRiskChart";
import SymptomChart from "./SymptomChart";
import preval from 'preval.macro';
import pkg from '../../package.json';
import ComparisonChart from "./ComparativeChart";
import CsvEditor from "./CsvEditor";

const CSV = `"cnt","covid_dx","symptom_text"
67832,,
66685,"no Dx covid",
34887,,"no Sx covid"
34741,"no Dx covid","no Sx covid"
19545,,"Fever or chills"
18610,"no Dx covid","Fever or chills"
17911,,"Nausea or vomiting"
17593,,"Cough"
17423,"no Dx covid","Nausea or vomiting"
16757,"no Dx covid","Cough"
14691,,"Diarrhea"
14222,"no Dx covid","Diarrhea"
9621,,"Congestion or runny nose"
9146,"no Dx covid","Congestion or runny nose"
7453,,"Headache"
7157,"no Dx covid","Headache"
7036,,"Sore throat"
6724,"no Dx covid","Sore throat"
6291,,"Shortness of breath or difficulty breathing"
5971,"no Dx covid","Shortness of breath or difficulty breathing"
4773,,"Fatigue"
4491,"no Dx covid","Fatigue"
2194,"U07.1 COVID19",
1487,,"Muscle or body aches"
1431,"no Dx covid","Muscle or body aches"
1324,"U07.1 COVID19","Fever or chills"
1157,"U07.1 COVID19","Cough"
632,"U07.1 COVID19","Nausea or vomiting"
594,"U07.1 COVID19","Diarrhea"
591,"U07.1 COVID19","Congestion or runny nose"
367,"U07.1 COVID19","Shortness of breath or difficulty breathing"
360,"U07.1 COVID19","Sore throat"
358,"U07.1 COVID19","Headache"
318,,"Anosmia"
316,"U07.1 COVID19","Fatigue"
236,"no Dx covid","Anosmia"
219,"U07.1 COVID19","no Sx covid"
84,"U07.1 COVID19","Anosmia"
60,"U07.1 COVID19","Muscle or body aches"`;

export default function App() {

    const [csv, setCsv] = useState(CSV);
    const [data, setData] = useState<Data>([]);
    const [parseError, setParseError] = useState<string | null>(null);

    useEffect(() => {
      try {
        let parsed = parseCSV(csv)
        setData(parsed)
        setParseError(null)
      } catch(e) {
        setParseError(e + "")
      }
    }, [csv])

    return (
        <>
            <header>
              <div className="container">
                <h1>The relationship between COVID-19, and common symptoms related to the disease.</h1>
                <h2>by Dia Khosla</h2>
              </div>
            </header>
            <main>
                <h3>Intro</h3>
                <p>
                There were a total of 165527 patients’ records used within the study. The patient cohort selection originated from Boston Children’s Hospital Emergency Department, during 2020-2022, and sought treatment for symptoms related to the disease. The overall aim was to establish the relationship between 11 of the symptoms commonly associated with the virus, and whether a patient has contracted it or not. Overall, 2194 received a diagnosis of COVID. Patient counts were extracted from a csv file, parsed, and rendered into multiple graphs, including a pie chart, bar chart, and bar plus spline chart. 
 
                The patient counts were collected monthly, and their totals were rendered into a graph.The patient count peaked at one years old, with a total of approximately 11k. There are more male patients from 0-13 however only marginally (~1.8k per sex at age 13) and more females over 14. The overall patient count decreases after age 1 till age 12, where it slightly rises till age 15, before decreasing again. After age 21, the patient count is minimal (<1k).
                </p>

                <p>
                In the first graph, regarding the distribution of symptoms in all individuals given COVID-19, the results were quite varied. Most patients (19,545) had fever and chills, closely followed by nausea and vomiting (17,911), and cough (17, 593). The less common symptoms included muscle and body aches (1487), and anosmia (318). The distribution is calculated by working out the number of patients with a specific symptom, from within the csv file and is eventually rendered into a pie chart.
                </p>

                <SymptomChart data={data} className="resizable" />

                <p>
                  In the second graph, relating to the prevalence of a symptom within a patient given COVID-19, the results follow a similar trend, with fever and chills being the highest probability (28.81%), and anosmia at the lowest (0.47%). The colour scheme used within the bar charts provides a visual representation of the likelihood of a symptom, with red correlating to a higher probability. The probability is calculated by taking the data within the csv file, and times by 100, in order to make it a percentage, with the colour scheme directly depending upon the value provided.
                </p>

                <ProbabilityChart data={data} />

                <p>
                In the third graph, the relative risk is calculated of an individual having COVID-19, given their symptoms present. If an individual has anosmia, the chances of them having the virus is high, at 10.82, contrasting with the next symptoms, which average to around 2, including Fever and chills (2.16), Cough (2.10), and Fatigue (2.14). All numbers have been rounded to 2 decimal places for easier analysis. The relative risk is calculated by a deceleration of 4 different variables within the code: 
                A = Covid diagnosis & presence of a specific symptom 
                B = Covid diagnosis & no presence of a specific symptom - A
                C = No covid diagnosis & presence of a specific symptom 
                D = No covid diagnosis & no presence of a specific symptom - C

                </p>

                <RelativeRiskChart data={data} />
                
                <p>
                By doing this study, I have learnt how to use typescript, and how to render graphs from csv file using a mixture of typescript and JavaScript. In addition, I have learnt how to utilise platforms such as GitHub.
                </p>
                <ComparisonChart data={data} />
            </main>
            <footer style={{ fontSize: "small" }}>
              <div className="container">
                <a
                  href="https://github.com/smart-on-fhir/covid-symptom-risk-ctakes"
                  target="_blank"
                  rel="noreferrer noopener"
                >GitHub</a>
                <CsvEditor csv={csv} parseError={parseError} onChange={setCsv}/>

                
                <div>
                  <span>Last build: {preval`module.exports = new Date().toLocaleString();`}</span>
                  <span>Version: { pkg.version }</span>
                </div>
              </div>
            </footer>
        </>
    );
}
