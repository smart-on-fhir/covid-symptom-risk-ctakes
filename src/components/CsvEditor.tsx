interface CsvEditorProps {
    parseError: string | null
    onChange: (value: string) => void
    csv: string
    
    
}

export default function CsvEditor({parseError, onChange, csv }:CsvEditorProps) {
        if (!document.location.search.includes("csv")) {
            return <a className="no-print" href="./?csv">View/Edit Data</a>
        }
          return <>
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
              onChange={e => onChange(e.target.value) }
            />
          </> 
          
      }
