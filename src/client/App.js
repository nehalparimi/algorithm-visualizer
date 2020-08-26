import React, { Component } from 'react';
import Graph from './graph/Graph';

class App extends Component {
    state = { username: null };

    componentDidMount() {
        fetch('/api/user')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username}));
    }

    render() {
        return(
            <Graph />
        )
    }
}

export default App