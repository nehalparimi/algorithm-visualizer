import React, { Component } from 'react'
import Vertex from './Vertex'
import './Graph.css'

class Graph extends Component {
    constructor() {
        super();

        this.state = {
            s_x: 4,
            s_y: 5,
            e_x: Infinity,
            e_y: Infinity,
            graph: []
        }
        this.generateGraph = this.generateGraph.bind(this);
        this.bfs = this.bfs.bind(this); 
        this.pickNode = this.pickNode.bind(this);
    }

    generateGraph() {
        let graph = [];
        for (let i = 0; i < 10; i++) {
            let arr = [];
            for (let j = 0; j < 30; ++j) {
                if (i == this.state.s_x && j == this.state.s_y){
                    arr.push(-2);
                    continue;
                }
                arr.push(0); 
            }
            graph.push(arr);
        }
        this.setState({ 
            graph: graph,
            s_x: 4,
            s_y: 5,
            e_x: Infinity,
            e_y: Infinity,
         });
    }

    componentDidMount() {
        this.generateGraph();
    }

    bfs(startX, startY, endX, endY) {
        const { graph } = this.state;
        let visited = [...graph];

        function Coordinate(x, y) {
            this.x = x;
            this.y = y;
        }

        function isValid(x, y) {
            return x >= 0 && x < graph.length 
                && y >= 0 && y < graph[x].length
                && !visited[x][y]
        }

        const q = [];
        const start = new Coordinate(startX, startY);

        visited[start.x][start.y] = -2;
        this.setState({
            graph: visited
        });

        q.push(start);
        let qIter = 0;

        while (qIter < q.length) {
            let current = q[qIter];
            let { x, y } = current;

            const shift = [[0, 1], [1, 0], [0, -1], [-1, 0]];
            for (const arr of shift) {
                if (isValid(x + arr[0], y + arr[1])) {
                    let validNeighbor = new Coordinate(x + arr[0], y + arr[1]);
                    visited[validNeighbor.x][validNeighbor.y] = 1;
                    
                    this.setState({
                        graph: visited,
                    });

                    if (validNeighbor.x === endX && validNeighbor.y === endY) {
                        visited[validNeighbor.x][validNeighbor.y] = -1;
                        return true;
                    }
                    q.push(validNeighbor);
                    
                }
            }
            qIter++;
        }
        return false;
    }

    pickNode(event) {
        console.log(event.target.getAttribute('x'));
        this.setState({
            e_x: parseInt(event.target.getAttribute('x')),
            e_y: parseInt(event.target.getAttribute('y')),
        });
    }
    render() {
        let { s_x, s_y, e_x, e_y } = this.state;
        console.log(s_x, s_y, e_x, e_y)
        let disabled;
        if (s_x === Infinity || s_y === Infinity || e_x === Infinity || e_y === Infinity) 
            disabled = true
        else disabled = false;
        return (
            <div>
                <div className="graph" onClick={(e) => this.pickNode(e)}>
                    { this.state.graph.map((arr, i) => {
                        return arr.map((str, j) => {
                            let classname;
                            if (str === -2) classname = 'start';
                            if (str === 0) classname = 'unvisited';
                            if (str === 1) classname = 'visited';
                            if (str === -1) classname = 'finish';
                            return <Vertex key={i + j} x={i} y={j} className={classname} />
                        })
                    }) }                
                </div>
                <button className="runButton" onClick={() => this.bfs(s_x, s_y, e_x, e_y)} disabled={disabled}>Run BFS</button>
                <button className="runButton" onClick={this.generateGraph}>Reset</button>
            </div>
            
        )
    }
}

export default Graph;