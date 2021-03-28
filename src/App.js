import React, { Component } from 'react';

import DataViewer from './components/DataViewer';
import Footer from './components/Footer';
import Header from './components/Header';
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
        <Header />
        <div className="App-info">
          <h2>
            About
          </h2>
          <p>
            The emergence of numerous SARS-CoV-2 variants across the globe is posing new challenges in tackling the ongoing pandemic. 
            Especially, mutations in the receptor binding domain (RBD) on the spike protein may have a larger impact due to their 
            critical role in human ACE2 recognition. Through CoVarACE, we describe the changes in binding affinity and the key 
            residues related to the complexes of ACE2 with {'>'}50 RBD mutants assessed using molecular dynamics simulation.
          </p>
          <ul>
            <li>Select a variant from the dropdown below to view its associated per-residue free energy decomposition.</li>
            <li>Filter variants by country or continent by typing in the variant dropdown/search bar.</li>
            <li>Use mouse or trackpad controls to interact with the structure visualization viewport.</li>
            <li>Use the available toggles on the free energy decomposition plot to highlight specific data points and save the plot to an image.</li>
            <li>Customize the representation of the Spike-ACE2 complex through the representation dropdown.</li>
            <li>[in development] Adjust the threshold to view key residues with an energy contribution below this value.</li>
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
        <Footer />
      </div>
    );
  }
}
