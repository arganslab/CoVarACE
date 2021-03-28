import React, { Component } from 'react';
import Plot from 'react-plotly.js';

import './DataViewer.css';


export default class DataViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decompositionData: {}, 
        }

        this.updateDecompositionData = this.updateDecompositionData.bind(this);
    }

    componentDidMount() {
        this.updateDecompositionData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.variant !== this.props.variant) {
            this.updateDecompositionData();
        }
    }

    updateDecompositionData() {
        if (this.props.variant === 'E484K') {
            this.setState({ decompositionData: {} });
        } else {
            const decompositionData = require(`../data/decomposition/DECOMP_${this.props.variant}.json`);
            this.setState({ decompositionData });
        }
    }

    render() {
        let plotTitleFragment = this.props.variant;
        if (this.props.variant === 'Nonglycosylated') {
            plotTitleFragment = 'Non-Glycosylated WT';
        } else if (this.props.variant === 'Glycosylated') {
            plotTitleFragment = 'Glycosylated WT';
        }

        const dataExists = Object.keys(this.state.decompositionData).length > 0;

        let hoverText = [];
        if (dataExists) {
            hoverText = this.state.decompositionData.resids.map(
                (elem, i) => `${this.state.decompositionData.resnames[i]}${elem} (${this.state.decompositionData.structure[i]})`
            );
        }

        return (
            <div>
                <div className="plot-container">
                    {
                    (
                        dataExists 
                        && this.props.vWidth > 0 
                        && this.props.vHeight > 0
                    )
                    ?    <Plot
                            data={[
                                {
                                    type: 'bar', 
                                    x: this.state.decompositionData.resids, 
                                    y: this.state.decompositionData.totals.averages, 
                                    hoverinfo: 'text+y', 
                                    text: hoverText, 
                                },
                            ]}
                            layout={ {
                                width: 0.4 * this.props.vWidth, 
                                height: 0.6 * this.props.vHeight, 
                                title: `Per-Residue Free Energy Decomposition: ${plotTitleFragment}<br><span style="font-size: 14">Binding Affinity (\u0394G) = ${Math.round(this.state.decompositionData.binding_affinity.average * 100) / 100}</span>`, 
                                xaxis: {
                                    zeroline:false, 
                                    title: 'Residue ID', 
                                    autotick: false, 
                                    ticks: 'outside', 
                                    tick0: 0, 
                                    dtick: 50, 
                                    showgrid: true, 
                                    showline: true, 
                                    rangemode: 'tozero', 
                                    autorange: true, 
                                },
                                yaxis: {
                                    zeroline:false, 
                                    title: 'Energy Contribution (kcal/mol)', 
                                    ticks: 'outside', 
                                    showgrid: true, 
                                    showline: true, 
                                    exponentformat: 'e', 
                                }, 
                            } }
                        />
                    : <h4>Please select another structure.</h4>
                    }
                </div>
            </div>
        );
    }
}
