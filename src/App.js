import React, { Component } from 'react';
import ReactGA from 'react-ga';

import DataViewer from './components/DataViewer';
import Footer from './components/Footer';
import Header from './components/Header';
import StructureViewer from './components/StructureViewer';
import VariantSelect from './components/VariantSelect';
import './App.css';


ReactGA.initialize('UA-193185054-1');

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
    ReactGA.pageview(window.location.pathname);
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
            Coronavirus pandemic caused by the severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) 
            remains a serious health concern for human population and has already resulted in over 
            2.5 million deaths worldwide. While a few RNA-based vaccines have been developed and the 
            preparation to vaccinate the global human population is underway, the emergence of numerous 
            SARS-CoV-2 variants across the globe is posing new challenges in tackling the ongoing pandemic. 
            Especially, mutations in the receptor binding domain (RBD) on the spike protein of SARS-CoV-2 may 
            have a larger impact due to their critical role in recognition of human angiotensin-converting enzyme 2 (ACE2) 
            for inducing the viral infection. Therefore, our team is focused on building atomistic models of the 
            SARS-CoV-2 RBD variants and understanding their impacts on the specific molecular interactions of 
            spike RBD with human ACE2. CoVarACE is a database that disseminates the qualitative and quantitative 
            insights gained from our scientific efforts.
          </p>
          <br />
          <p>
            <i>
              Disclaimer: The goal of this database is to share our new knowledge as they are gained to promote COVID-19 research. 
              The research is still not peer-reviewed and will be shortly submitted for publication in a suitable journal.
            </i>
          </p>
          {
            false &&
            <ul>
              <li>Select a variant from the dropdown below to view its associated per-residue free energy decomposition.</li>
              <li>Filter variants by country or continent by typing in the variant dropdown/search bar.</li>
              <li>Use mouse or trackpad controls to interact with the structure visualization viewport.</li>
              <li>Use the available toggles on the free energy decomposition plot to highlight specific data points and save the plot to an image.</li>
              <li>Customize the representation of the Spike-ACE2 complex through the representation dropdown.</li>
              <li>[in development] Adjust the threshold to view key residues with an energy contribution below this value.</li>
            </ul>
          }
          <br />
          <p>
            If any information from this database is used for research purposes, please cite the following source:
          </p>
          <br />
          <p>
            <i>
              Fizal F., Do Le, D.L., Kalyaanamoorthy, S, Ganesan, A, 
              “CoVarACE - an online repository describing the effects of spike mutations on 
              human ACE2 recognition by SARS-CoV-2 variants assessed using in silico analyses”, 
              University of Waterloo-School of Pharmacy Research Day 2021, 5-May-2021.
            </i>
          </p>
          <br />
          <p>
            For more information contact: Dr. Ganesan (a.ganesan@uwaterloo.ca); Dr. Kalyaanamoorthy (subha.kalyaanamoorthy@uwaterloo.ca).
          </p>
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
