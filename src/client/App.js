import React, { Component } from 'react';
import Graph from './graph/Graph';

class App extends Component {
    state = { username: null };

    render() {
        return(
            <div className="main">
                <Graph />
            </div>
        )
    }
}

export default App