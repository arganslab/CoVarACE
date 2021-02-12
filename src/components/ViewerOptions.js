import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import './ViewerOptions.css';


// because the css class wasn't working for some reason
const containerStyles = {
    'color': 'white',
    'paddingTop': '2vh',
    'display': 'flex',
    'flexDirection': 'row',
    'alignItems': 'center',
    'justifyContent': 'flex-start',
    'fontWeight': '600',
};

const reprOptions = ['Ribbon', 'Ball + Stick', 'Licorice', 'Cartoon'];

export default class ViewerOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repr: 'ribbon',
            threshold: -1,
        };

        this.setRepr = this.setRepr.bind(this);
        this.adjustThreshold = this.adjustThreshold.bind(this);
    }

    setRepr = repr => {
        this.setState({ repr });
    }

    adjustThreshold = val => {
        console.log(val);
        if (val !== null) {
            this.setState({ threshold: val });
        }
    }

    render() {
        return (
            <div style={containerStyles}>
                <div className="repr-option">
                    <Dropdown options={reprOptions} onChange={this.setRepr} value={reprOptions[0]} />
                </div>
                <div className="threshold-option">
                    <div id="threshold-display">
                        <p>Threshold: {this.state.threshold} kcal mol<sup>-1</sup></p>
                    </div>
                    <input 
                        type="range" 
                        name="threshold" 
                        min="-5" 
                        max="5" 
                        step="0.1"
                        defaultValue="-1"  
                        onChange={e => this.adjustThreshold(e.target.value)}
                    />
                </div>
            </div>
        );
    }
}
