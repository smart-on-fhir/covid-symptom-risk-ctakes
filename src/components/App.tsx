import { useEffect, useState } from "react";
import { Data, parseCSV } from "../lib";
import ProbabilityChart from "./ProbabilityChart";
import RelativeRiskChart from "./RelativeRiskChart";
import SymptomChart from "./SymptomChart";
import preval from 'preval.macro';
import pkg from '../../package.json';

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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Pulvinar sapien et ligula ullamcorper malesuada proin libero.
                  Lacus sed turpis tincidunt id aliquet risus. Viverra accumsan in
                  nisl nisi scelerisque eu. Vitae elementum curabitur vitae nunc sed.
                  Urna porttitor rhoncus dolor purus non enim praesent elementum
                  facilisis. Ut aliquam purus sit amet luctus venenatis. Arcu non
                  odio euismod lacinia at quis. Senectus et netus et malesuada fames
                  ac. Morbi tincidunt augue interdum velit euismod in.
                </p>

                <p>
                  Odio ut sem nulla pharetra diam sit amet nisl. Ut tellus elementum
                  sagittis vitae et leo duis ut. Facilisis gravida neque convallis a
                  cras semper auctor neque vitae. Nunc aliquet bibendum enim
                  facilisis gravida neque convallis a cras. Sed egestas egestas
                  fringilla phasellus faucibus. Tristique senectus et netus et
                  malesuada fames ac. Tempor commodo ullamcorper a lacus vestibulum
                  sed arcu. Quis hendrerit dolor magna eget. Gravida dictum fusce ut
                  placerat orci nulla pellentesque dignissim enim. Ornare aenean
                  euismod elementum nisi quis eleifend quam adipiscing vitae. Cursus
                  mattis molestie a iaculis at erat pellentesque adipiscing commodo.
                </p>

                <SymptomChart data={data} />

                <p>
                  Dictum sit amet justo donec enim diam vulputate ut. Pretium fusce
                  id velit ut tortor. Pretium viverra suspendisse potenti nullam ac
                  tortor. Aliquet nibh praesent tristique magna sit. Sem fringilla
                  ut morbi tincidunt augue interdum velit euismod. Pretium fusce id
                  velit ut tortor pretium viverra suspendisse. Arcu risus quis varius
                  quam quisque id diam. Pharetra sit amet aliquam id diam maecenas
                  ultricies mi eget. Commodo sed egestas egestas fringilla phasellus.
                  Volutpat ac tincidunt vitae semper quis lectus nulla. Sit amet
                  nulla facilisi morbi tempus iaculis urna id. Purus faucibus ornare
                  suspendisse sed nisi lacus sed viverra tellus. Leo a diam
                  sollicitudin tempor.
                </p>

                <ProbabilityChart data={data} />

                <p>
                  Eu non diam phasellus vestibulum lorem. Duis at tellus at urna
                  condimentum mattis pellentesque id nibh. Massa eget egestas purus
                  viverra accumsan in nisl nisi scelerisque. Vel orci porta non
                  pulvinar neque laoreet. Nisi est sit amet facilisis magna. Amet
                  est placerat in egestas erat. Fermentum et sollicitudin ac orci
                  phasellus egestas tellus rutrum tellus. Curabitur vitae nunc sed
                  velit dignissim sodales. Accumsan in nisl nisi scelerisque eu
                  ultrices vitae auctor. Mi proin sed libero enim sed faucibus turpis.
                  Elit pellentesque habitant morbi tristique senectus.
                </p>

                <RelativeRiskChart data={data} />
                
                <p>
                  Erat nam at lectus urna duis convallis convallis. Purus sit amet
                  volutpat consequat mauris nunc. Lorem donec massa sapien faucibus.
                  Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.
                  Faucibus ornare suspendisse sed nisi. Risus in hendrerit gravida
                  rutrum quisque non. Non pulvinar neque laoreet suspendisse interdum
                  consectetur. Gravida dictum fusce ut placerat orci nulla
                  pellentesque dignissim enim. Accumsan sit amet nulla facilisi morbi
                  tempus. Amet luctus venenatis lectus magna. Ipsum suspendisse
                  ultrices gravida dictum.
                </p>
            </main>
            <footer style={{ fontSize: "small" }}>
              <div className="container">
                <a
                  href="https://github.com/smart-on-fhir/covid-symptom-risk-ctakes"
                  target="_blank"
                  rel="noreferrer noopener"
                >GitHub</a>
                {
                  document.location.search.includes("csv") ?
                    <>
                      <a className="no-print" href="./">Hide Data Editor</a>
                      {
                        parseError ?
                          <code className="has-error">{ parseError }</code> :
                          <code>Edit CSV and watch changes applied to charts</code>
                      }
                      <textarea
                        title={parseError || undefined}
                        className={ "no-print" + (parseError ? " has-error" : "") }
                        id="csv"
                        autoCapitalize="no"
                        autoCorrect="no"
                        spellCheck="false"
                        value={csv}
                        onChange={e => setCsv(e.target.value) }
                      />
                    </> :
                    <a className="no-print" href="./?csv">View/Edit Data</a>
                }
                <div>
                  <span>Last build: {preval`module.exports = new Date().toLocaleString();`}</span>
                  <span>Version: { pkg.version }</span>
                </div>
              </div>
            </footer>
        </>
    );
}
