import React, { Component } from 'react';
import Graph from './graph/Graph';

class App extends Component {
    state = { username: null };

    render() {
        return(
            <div className="main">
                <div className="nav">
                    <ul style={{ display: 'flex', listStyle: 'none' }}>
                        <li>Item 1</li>
                        <li>Item 1</li>
                        <li>Item 1</li>
                        <li>Item 1</li>
                        <li>Item 1</li>
                    </ul>
                </div>
                <Graph />
            </div>
        )
    }
}

export default App