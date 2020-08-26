import React, { Component } from 'react'
import Vertex from './Vertex'
import './Graph.css'

class Graph extends Component {
    constructor() {
        super();

        this.state = {
            graph: []
        }
    }

    generateGraph() {
        let arr = [];
        for (let i = 0; i < 100; i++) {
            let color = Math.random() > 0.5 ? "white" : "black";
            arr.push(<Vertex color={color}/>);
            
        }
        this.setState({
            graph: arr,
        });
    }

    componentDidMount() {
        this.generateGraph();
    }
    render() {
        return (
            <div className="graph">
                {this.state.graph}
            </div>
            
        )
    }
}

export default Graph;