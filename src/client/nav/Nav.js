import React, { Component } from 'react';
import './Nav.css'

class Nav extends Component {

    constructor(props) {
        super(props);

        this.state = {
            d: "none",
            algo: null

        }
    }
    toggleDropdown = (e) => {
        let d = this.state.d === "block" ? "none" : "block";

        this.setState({ d });
    }

    pickAlgorithm = (e) => {
        console.log(e.target.getAttribute('value'));
        let algo = e.target.getAttribute('value');
        this.setState({ algo });

        this.toggleDropdown(e);

        this.props.algorithmPicked(this.state.algo);
    }

    render() {
        return (
            <nav className="navBar">
                <div className="dropdownContainer">
                    <span className="dropdownTrigger" onClick={e => this.toggleDropdown(e)}>Click Here</span>
                    <ul className="dropdownChoice" style={{ display: this.state.d, position: "absolute" }}>
                        <li value="BFS" onClick={e => this.pickAlgorithm(e)} >BFS</li>
                        <li value="DFS" onClick={e => this.pickAlgorithm(e)} >DFS</li>
                        <li value="Dijkstra" onClick={e => this.pickAlgorithm(e)} >Dijkstra</li>
                    </ul>
                </div>

            </nav>
        )
    } 
}

export default Nav;