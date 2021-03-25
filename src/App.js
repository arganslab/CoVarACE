import React, { Component } from 'react';

import DataViewer from './components/DataViewer';
import StructureViewer from './components/StructureViewer';
import VariantSelect from './components/VariantSelect';
import './App.css';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variant: 'Nonglycosylated',
      vWidth: 0, 
      vHeight: 0, 
    };

    this.handleVariantSelect = this.handleVariantSelect.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  handleVariantSelect(variant) {
    this.setState({ variant });
  }

  updateDimensions() {
    this.setState({ vWidth: window.innerWidth, vHeight: window.innerHeight });
  }

  render() {
    return (
      <div className="App">
        <div className="App-info">
          <h2>
            About
          </h2>
          <ul>
            <li>add instructions/info here</li>
          </ul>
        </div>
        <VariantSelect 
          handleVariantSelect={(selection) => this.handleVariantSelect(selection) }
        />
        <div className="data-container">
          <StructureViewer 
            variant={this.state.variant} 
            vWidth={this.state.vWidth} 
            vHeight={this.state.vHeight} 
          />
          <DataViewer 
            variant={this.state.variant} 
            vWidth={this.state.vWidth} 
            vHeight={this.state.vHeight} 
          />
        </div>
      </div>
    );
  }
}
