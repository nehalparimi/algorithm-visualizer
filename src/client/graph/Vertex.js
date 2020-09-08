import React, { Component } from 'react';
import './Vertex.css'

class Vertex extends Component {
    constructor(props) {
        super(props);
    }
    render() {
    return <div x={this.props.x} y={this.props.y} style={{ border: "1px solid black" }} className={this.props.className}>{this.props.weight}</div>
    }
    
}

export default Vertex;