import React, { Component } from 'react';
import './Vertex.css'

class Vertex extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            backgroundColor: this.props.color,
            border: "1px solid black"
        }

        this.toggleColor = this.toggleColor.bind(this);
    }

    toggleColor() {
        let color = this.state.backgroundColor;

        if (color == "white") {
            this.setState({
                backgroundColor: "black",
            });
        }
        else {
            this.setState({
                backgroundColor: "white",
            });
        }
    }



    render() {
        return <div className="node" style={this.state} onClick={this.toggleColor}></div>
    }
    
}

export default Vertex;