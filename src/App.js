import React, { Component } from 'react';

import DataViewer from './components/DataViewer';
import StructureViewer from './components/StructureViewer';
import VariantSelect from './components/VariantSelect';
import './App.css';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variant: 'WT',
    };

    this.handleVariantSelect = this.handleVariantSelect.bind(this);
  }

  handleVariantSelect(variant) {
    this.setState({ variant });
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
          />
          <DataViewer 
            variant={this.state.variant} 
          />
        </div>
      </div>
    );
  }
}
