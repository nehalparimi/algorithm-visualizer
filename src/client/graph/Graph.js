import React, { Component } from 'react'
import Vertex from './Vertex'
import './Graph.css'

class Graph extends Component {
    constructor() {
        super();

        this.state = {
            graph: []
        }
        this.generateGraph = this.generateGraph.bind(this);
        this.bfs = this.bfs.bind(this); 
    }

    generateGraph() {
        let graph = [];
        for (let i = 0; i < 10; i++) {
            let arr = [];
            for (let j = 0; j < 30; ++j) {
                arr.push(<Vertex key={i + j} x={i} y={j} className='unvisited' />); 
            }
            graph.push(arr);
        }
        this.setState({ graph });
    }

    componentDidMount() {
        this.generateGraph();
    }

    bfs(startX, startY, endX, endY) {
        let { graph } = this.state;
        let visited = [];

        for (let i = 0; i < graph.length; ++i) {
            let arr = [];

            for (let j = 0; j < graph[i].length; ++j) {
                arr.push(0);
            }
            visited.push(arr);
        }

        function checkIfValid(x, y) {
            return x >= 0 && x < graph.length
                && y >= 0 && y < graph[x].length
                && !visited[x][y]
        } 

        let start = graph[startX][startY];

        let queue = [];
        queue.push(start);
        visited[startX][startY] = 1;
     
        let queueIter = 0;

        while (queueIter < queue.length) {
            let current = queue[queueIter];
            let { x, y } = current.props;
            let dupGraph = graph;

            // if (x == endX && y === endY) return true;


            let shift = [[0, 1], [1, 0], [0, -1], [-1, 0]];
            for (let arr of shift) {
                let xCoor = x + arr[0];
                let yCoor = y + arr[1];
                if (checkIfValid(xCoor, yCoor)) {
                    let validNeighbor = graph[xCoor][yCoor];
                    visited[xCoor][yCoor] = 1;
                    if (validNeighbor.props.x == endX && validNeighbor.props.y == endY) return true;
                    queue.push(validNeighbor);
                }
            }
            console.log(dupGraph[x][y].props.className);
            
                this.setState({
                    graph: dupGraph,
                });
            
            queueIter++;
        }
        return false;
    }

    render() {
        const { graph } = this.state;
        return (
            <div className="graph">
                { graph }
                <button className="runButton" onClick={() => this.bfs(0, 0, 5, 6)}>Run BFS</button>
            </div>
            
        )
    }
}

export default Graph;