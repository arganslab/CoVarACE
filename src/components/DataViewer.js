import React, { Component } from 'react';
import Plot from 'react-plotly.js';

import './DataViewer.css';


export default class DataViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decompositionData: {}, 
            vWidth: 0, 
            vHeight: 0, 
        }

        this.updateDimensions = this.updateDimensions.bind(this);
        this.updateDecompositionData = this.updateDecompositionData.bind(this);
    }

    componentDidMount() {
        this.updateDecompositionData();
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.variant !== this.props.variant) {
            this.updateDecompositionData();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        this.setState({ vWidth: window.innerWidth, vHeight: window.innerHeight });
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

        return (
            <div className="plot-container">
                {
                (
                    Object.keys(this.state.decompositionData).length > 0
                    && this.state.vWidth > 0 
                    && this.state.vHeight > 0
                )
                ?    <Plot
                        data={[
                            {
                                type: 'bar', 
                                x: this.state.decompositionData.resids, 
                                y: this.state.decompositionData.totals.averages, 
                            },
                        ]}
                        layout={ {
                            width: 0.4 * this.state.vWidth, 
                            height: 0.6 * this.state.vHeight, 
                            title: `Per-Residue Free Energy Decomposition: ${plotTitleFragment}`
                        } }
                    />
                : <h4>Please select another structure.</h4>
                }
            </div>
        );
    }
}
