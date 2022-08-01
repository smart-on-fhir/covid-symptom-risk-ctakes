export type Data = Row[]

export interface Row {
    cnt         : number
    covid_dx    : string | null
    symptom_text: string | null
}

export type Where = Partial<Omit<Row, "cnt">>

export function parseCSV(input: string): Data {
    const firstEolIndex = input.indexOf("\n")
    const header = parseDelimitedLine(input.slice(0, firstEolIndex)) as unknown as (keyof Row)[];

    return input
        .slice(firstEolIndex + 1)
        .trim()
        .split(/\n/)
        .map((line, i) => {
            try {
                var lines = parseDelimitedLine(line)
            } catch (ex: any) {
                ex.message += ` on line ${i + 2}`;
                throw ex
            }
            
            return lines.reduce(
                (prev:any, cur, i) => {
                    prev[header[i]] = cur
                    return prev
                }, {}
            )
        });
}

/**
 * Splits the line into cells using the provided delimiter (or by comma by
 * default) and returns the cells array. supports quoted strings and escape
 * sequences.
 * @param line The line to parse
 * @param delimiter The delimiter to use (defaults to ",")
 * @returns The cells as array of strings
 */
export function parseDelimitedLine(
    line: string,
    delimiters: string[] = [","],
    stringDelimiter: string = '"'
): string[] {
    const out: string[] = [];
    const len: number   = line.length;

    let idx    = 0,
        char   = "",
        expect = null,
        buffer = "";

    while (idx < len) {
        char = line[idx++];
        
        // String
        if (char === stringDelimiter) {

            // begin string
            if (!expect) {
                expect = char;
            }

            // Escaped quote - continue string
            else if (line[idx] === char) {
                buffer += char;
                idx++;
            }

            // Close string
            else {
                expect = null;
                out.push(buffer);
                buffer = "";
                idx++;
            }
        }

        // delimiter
        else if (delimiters.includes(char)) {
            if (!expect) {
                try {
                    out.push(JSON.parse(buffer || "null"));
                } catch {
                    out.push(buffer); // Column name (should be a string but is not quoted)
                }
                buffer = "";
            }
            else {
                buffer += char;
            }
        }

        // default
        else {
            buffer += char;
        }
    }

    if (buffer) {
        try {
            out.push(JSON.parse(buffer || "null"));
        } catch {
            out.push(buffer); // Column name (should be a string but is not quoted)
        }
        buffer = "";
    }

    if (expect) {
        throw new SyntaxError(`unterminated string. Expecting '"'`);
    }

    return out;
}

export function getUniqueValuesFromColumn(data: Data, columnName: keyof Where){
    let output: string[] = []
    data.forEach(row => {
        let value = row[columnName] || '';
        if (value && !output.includes(value)) {
            output.push(value);
        }
    });
    return output
}

export function find(data: Data, where: Where = {}) {
    return data.find(rec => {

        // If the column is specified in the where conditions, make sure its
        // value matches the one specified in where
        const keys = Object.keys(where)
        const aBadRow = keys.some(key => {
            const value = where[key as keyof Where ]
            const value2 = rec[key as keyof Row]
            return value !== value2

        })
        
        if (aBadRow){
            return false 
        }


        // If the key is not "cnt" and is not mentioned in "where", then it must be null
        const dataKeys = Object.keys(rec)
        const rejected = dataKeys.some(key => {
            if (key === 'cnt') {
                return false 
            }
            if (key in where) {
                return false 
            }
            const value = rec[key as keyof Row] 

            if (value !== null){
                return true 
            }

            return false 
        })

        if (rejected){
            return false 
        }

        // Otherwise this should be the row we are looking for
        return true
    })
}

export function count(data: Data, where: Where = {}) {
    return find(data, where)?.cnt || 0
}

export function probability(data: Data, where: Where) {
    return count(data, where) / count(data)
}

export function relativeRisk(data: Data, symptom_text: string) {
    const a = count(data, { symptom_text, covid_dx: "U07.1 COVID19"});
    const b = count(data, {               covid_dx: "U07.1 COVID19"}) - a;
    const c = count(data, { symptom_text, covid_dx: "no Dx covid"  });
    const d = count(data, {               covid_dx: "no Dx covid"  }) - c;
    
    const numerator = a / (a + b);
    const denom     = c / (c + d);
    return numerator / denom;

    // return count(data, {
    //     symptom_text: symptom,
    //     covid_dx: "U07.1 COVID19"
    // }) / count(data, {
    //     symptom_text: symptom,
    //     covid_dx: "no Dx covid"
    // })
}
