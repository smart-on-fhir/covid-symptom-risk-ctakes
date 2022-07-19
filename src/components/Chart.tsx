import React from "react";
import Highcharts, { chart } from "highcharts";
import accessibility from "highcharts/modules/accessibility";
import colorChart from "highcharts/modules/coloraxis";
colorChart(Highcharts)
accessibility(Highcharts)


interface ChartProps {
    options: Highcharts.Options
    className?: string 
}


export default class Chart extends React.Component<ChartProps>
{
    chart: Highcharts.Chart | null = null;

    container = React.createRef<HTMLDivElement>();

    constructor(props: ChartProps) {
        super(props);
        this.updateChart = this.updateChart.bind(this);
    }

    updateChart() {
        try {
            // update(options [, redraw] [, oneToOne] [, animation])
            this.chart!.update(this.props.options, true, true, true)
        } catch (e) {
            console.debug(e)
        }
    }

    componentDidMount() {
        this.chart = chart(this.container!.current!, this.props.options );
    }

    componentDidUpdate() {
        this.updateChart();
    }

    render() {
        let x = "chart"+(this.props.className? " " +this.props.className: "")
        return <div ref={this.container} className={x}/>
    }
}
