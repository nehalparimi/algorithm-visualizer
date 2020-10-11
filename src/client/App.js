import React, { Component } from 'react';
import Graph from './graph/Graph';
import Nav from './nav/Nav'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            algo: null,
        }
    }

    algorithmPicked = (algo) => {
        this.setState({ algo });
    }

    render() {
        const { algo } = this.state;
        return(
            <div className="main">
                {/* <Nav algorithmPicked={this.algorithmPicked} /> */}
                <Graph algo={algo} />
            </div>
        )
    }
}

export default App