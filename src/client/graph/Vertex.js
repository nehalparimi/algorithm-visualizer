import React, { Component } from 'react';
import './Vertex.css'

class Vertex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classname: this.props.className
        }
    }

    componentDidUpdate() {
        console.log(this.props.className)
    }

    render() {
        return <div style={{ border: "1px solid black" }} className={this.state.classname}></div>
    }
    
}

export default Vertex;