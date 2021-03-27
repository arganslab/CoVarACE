import React, { Component } from 'react';
import { Stage } from 'ngl';
import raw from 'raw.macro';

import ViewerOptions from './ViewerOptions';
import './StructureViewer.css';

export default class StructureViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mutatedRes: [],
            importantRes: [],
            threshold: 1,
            repr: 'ribbon',
        }

        this.stage = null;
        this.changeRepr = this.changeRepr.bind(this);
    }

    componentDidMount() {
        this.stage = new Stage('viewport', { backgroundColor: "white" });
        const pdbData = raw('../data/structures/SARSCOV2_g_dry.pdb');
        const blobComplex = new Blob([ pdbData ], { type: 'text/plain' });
        this.stage.loadFile( blobComplex, { ext: "pdb" } ).then( comp => {
            comp.addRepresentation( "ribbon", { multipleBond: true });
            comp.autoView();
        } );
    }

    changeRepr = repr => {
        this.setState({ repr });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.variant !== this.props.variant) {
            // need to add highlighting
        }
        if (prevState.repr !== this.state.repr) {
            this.stage.eachComponent(comp => {
                comp.removeAllRepresentations();
                comp.addRepresentation(this.state.repr, { multipleBond: true });
            });
        }
        // logic for stage to update on resize
        if (prevProps.vWidth !== this.props.vWidth || prevProps.vHeight !== this.props.vHeight) {
            this.stage.handleResize();
        }
    }

    render() {
        return (
            <div>
                <div className="viewer-container">
                    <div id="viewport" className="viewer-canvas"></div>
                </div>
                <ViewerOptions changeRepr={this.changeRepr} />
            </div>
        );
    }
}
