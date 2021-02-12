import React, { Component } from 'react';
import Plot from 'react-plotly.js';

import './DataViewer.css';


export default class DataViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vWidth: 0,
            vHeight: 0,
        }

        this.updateDimensions = this.updateDimensions.bind(this);
        this.decompositionData = {};
    }

    componentDidMount() {
        // uncomment when data is ready
        //this.decompositionData = require(`../data/decomposition/${this.props.variant}.json`);
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        this.setState({ vWidth: window.innerWidth, vHeight: window.innerHeight });
    }

    render() {
        return (
            <div className="plot-container">
                {
                (
                    Object.keys(this.decompositionData).length > 0
                    && this.state.vWidth > 0 
                    && this.state.vHeight > 0
                )
                ?    <Plot
                        data={[
                            {
                                type: 'bar', 
                                x: this.decompositionData.resid, 
                                y: this.decompositionData.deltaG
                            },
                        ]}
                        layout={ {
                            width: 0.4 * this.state.vWidth, 
                            height: 0.6 * this.state.vHeight, 
                            title: `Decomposition Analysis: ${this.props.variant}`
                        } }
                    />
                : <h4>Please select another structure.</h4>
                }
            </div>
        );
    }
}
