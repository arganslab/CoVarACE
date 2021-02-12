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
    }

    componentDidMount() {
        this.stage = new Stage('viewport');
        const pdbData = raw('../data/structures/SARSCOV2_g_dry.pdb');
        const blobComplex = new Blob([ pdbData ], { type: 'text/plain' });
        this.stage.loadFile( blobComplex, { ext: "pdb" } ).then( comp => {
            comp.addRepresentation( "ribbon", { multipleBond: true } );
        } );
    }

    render() {
        return (
            <div>
                <div className="viewer-container">
                    <div id="viewport" className="viewer-canvas"></div>
                </div>
                <ViewerOptions />
            </div>
        );
    }
}
