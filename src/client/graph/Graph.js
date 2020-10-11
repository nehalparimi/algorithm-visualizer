import React, { Component } from 'react'
import Vertex from './Vertex'
import './Graph.css'

import Stack from '../algorithms/stack'

class Graph extends Component {
    constructor() {
        super();

        this.state = {
            s_x: 4,
            s_y: 5,
            e_x: Infinity ,
            e_y: Infinity,
            graph: [],
            searchType: null,
        }
        this.generateGraph = this.generateGraph.bind(this);
        this.bfs = this.bfs.bind(this); 
        this.dfs = this.dfs.bind(this);
        this.dijkstra = this.dijkstra.bind(this);
        this.pickNode = this.pickNode.bind(this);
        this.runBFS = this.runBFS.bind(this);
        this.runDFS = this.runDFS.bind(this);
        this.runDijkstra = this.runDijkstra.bind(this);
    }

    generateGraph() {
        let graph = [];
        for (let i = 0; i < 10; i++) {
            let arr = [];
            for (let j = 0; j < 30; ++j) {
                if (i == this.state.s_x && j == this.state.s_y){
                    
                    arr.push({ 
                        visited: -2, 
                        parent: null, 
                        inPath: 0, 
                        wall: 0,
                        weight: 0,
                        initDist: 0,
                    });
                    continue;
                }
                let t = Math.random() > 0.75;
                arr.push({
                    visited: 0,
                    parent: null,
                    inPath: 0,
                    wall: 0,
                    weight: Math.ceil(Math.random() * 10),
                    initDist: Infinity, 
                });
            }
            graph.push(arr);
        }
        this.setState({ 
            graph: graph,
            searchType: null,
         });
    }

    componentDidMount() {
        this.generateGraph();
    }

    dijkstra(startX, startY, endX, endY) {
        const { graph } = this.state;
        let visited = [...graph];

        function Coordinate(x, y, weight) {
            this.x = x;
            this.y = y;
            this.weight = weight;
        }

        const q = [];
        const shift = [[0, 1], [-1, 0], [0, -1], [1, 0]];


        function isValid(x, y) {
            return x >= 0 && x < graph.length
                && y >= 0 && y < graph[x].length
                && !visited[x][y].visited
                && !visited[x][y].wall
        }

        let start = new Coordinate(startX, startY, 0);
        q.push(start);
        visited[start.x][start.y].visited = -2;
        visited[start.x][start.y].parent = null;
        visited[start.x][start.y].inPath = 1;
        this.setState({
            graph: visited
        });

        while (q.length) {
            let current = q.shift();
            let { x, y } = current;
            let priority_array = [];
            for (const arr of shift) {
                if (isValid(x + arr[0], y + arr[1])) {
                    let validNeighbor = new Coordinate(x + arr[0], y + arr[1], Infinity);
                    visited[validNeighbor.x][validNeighbor.y].visited = 1;
                    visited[validNeighbor.x][validNeighbor.y].parent = current;
                    visited[validNeighbor.x][validNeighbor.y].initDist =
                        Math.min(visited[current.x][current.y].initDist + visited[validNeighbor.x][validNeighbor.y].weight, validNeighbor.weight);
                    
                    validNeighbor.weight = visited[validNeighbor.x][validNeighbor.y].initDist;
                    
                    this.setState({
                        graph: visited,
                    });

                    if (validNeighbor.x === endX && validNeighbor.y === endY) {
                        visited[validNeighbor.x][validNeighbor.y].visited = -1;
                        this.setState({ graph: visited });


                        let path_x, path_y;
                        let path_current = validNeighbor;

                        while (path_current) {
                            path_x = path_current.x;
                            path_y = path_current.y;

                            visited[path_x][path_y].inPath = 1;
                            this.setState({ graph: visited });
                            path_current = graph[path_current.x][path_current.y].parent;
                        }

                        this.setState({
                            graph: visited,
                        });
                        return true;
                    }
                    priority_array.push(validNeighbor);
                }
            }
            priority_array.sort(function(a, b) {
                return a.weight - b.weight;
            });
            console.log()
            priority_array.forEach(coordinate => {
                q.push(coordinate);
            });
        }
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
                && !visited[x][y].visited
                && !visited[x][y].wall
        }

        const q = [];
        const start = new Coordinate(startX, startY);

        visited[start.x][start.y].visited = -2;
        visited[start.x][start.y].parent = null;
        visited[start.x][start.y].inPath = 1;
        this.setState({
            graph: visited
        });

        q.push(start);
        let qIter = 0;

        while (qIter < q.length) {
            let current = q[qIter];
            let { x, y } = current;

            const shift = [[1, 0], [0, 1], [0, -1], [-1, 0]];
            for (const arr of shift) {
                if (isValid(x + arr[0], y + arr[1])) {
                    let validNeighbor = new Coordinate(x + arr[0], y + arr[1]);
                    visited[validNeighbor.x][validNeighbor.y].visited = 1;
                    visited[validNeighbor.x][validNeighbor.y].parent = current;
                    
                    this.setState({
                        graph: visited,
                    });

                    if (validNeighbor.x === endX && validNeighbor.y === endY) {
                        visited[validNeighbor.x][validNeighbor.y].visited = -1;
                        this.setState({ graph: visited });
                        

                        let path_x, path_y;
                        let path_current = validNeighbor;

                        while (path_current) {
                            path_x = path_current.x;
                            path_y = path_current.y;

                            visited[path_x][path_y].inPath = 1;
                            this.setState({ graph: visited });
                            path_current = graph[path_current.x][path_current.y].parent;
                        }

                        this.setState({
                            graph: visited,
                        });
                        return true;
                    }
                    q.push(validNeighbor);
                    
                }
            }
            qIter++;
        }
        return false;
    }

    dfs(startX, startY, endX, endY) {
        const { graph } = this.state;
        let visited = [...graph];

        function Coordinate(x, y) {
            this.x = x;
            this.y = y;
        }

        function isValid(x, y) {
            return x >= 0 && x < graph.length
                && y >= 0 && y < graph[x].length
                && !visited[x][y].visited
                && !visited[x][y].wall
        }

        const stack = new Stack;
        const start = new Coordinate(startX, startY);

        visited[start.x][start.y].visited = -2;
        visited[start.x][start.y].parent = null;
        visited[start.x][start.y].inPath = 1;
        this.setState({
            graph: visited
        });

        stack.push(start);

        while (!stack.empty()){
            let current = stack.returnFirst();
            let { x, y } = current;

            stack.pop();

            const shift = [[0, 1], [1, 0], [0, -1], [-1, 0]];
            for (const arr of shift) {
                if (isValid(x + arr[0], y + arr[1])) {
                    let validNeighbor = new Coordinate(x + arr[0], y + arr[1]);
                    visited[validNeighbor.x][validNeighbor.y].visited = 1;
                    visited[validNeighbor.x][validNeighbor.y].parent = current;

                    this.setState({
                        graph: visited,
                    });

                    if (validNeighbor.x === endX && validNeighbor.y === endY) {
                        visited[validNeighbor.x][validNeighbor.y].visited = -1;
                        this.setState({ graph: visited });


                        let path_x, path_y;
                        let path_current = validNeighbor;

                        while (path_current) {
                            path_x = path_current.x;
                            path_y = path_current.y;

                            visited[path_x][path_y].inPath = 1;
                            this.setState({ graph: visited });
                            path_current = graph[path_current.x][path_current.y].parent;
                        }

                        this.setState({
                            graph: visited,
                        });
                        return true;
                    }
                    stack.push(validNeighbor);
                }
            }
        }
        return false;
    }

    pickNode(event) {
        let g = [...this.state.graph];
        let x = parseInt(event.target.getAttribute('x'));
        let y = parseInt(event.target.getAttribute('y'));
        (g[x][y])['visted'] = -1;
        this.setState({
            e_x: x,
            e_y: y,
            graph: g,
        });
    }

    updateSearchtype = (e) => {
        this.setState({
            searchType: e.target.value
        })
    }

    runBFS(e) {
        // this is the function implemented keeping in mind that we should animate it soon
        // same with runDFS
        this.updateSearchtype(e);
        let { s_x, s_y, e_x, e_y } = this.state;
        this.bfs(s_x, s_y, e_x, e_y);
        // if (this.state.e_x || this.state.e_y) {
        //     this.setState({ e_x: Infinity, e_y: Infinity });
        //     return;
        // }
    }


    runDFS(e) {  
        this.updateSearchtype(e);
        let { s_x, s_y, e_x, e_y } = this.state;
        this.dfs(s_x, s_y, e_x, e_y);
        // if (this.state.e_x || this.state.e_y) {
        //     this.setState({ e_x: Infinity, e_y: Infinity });
        //     return;
        // }
    }

    runDijkstra(e) {
        this.updateSearchtype(e);
        let { s_x, s_y, e_x, e_y } = this.state;
        this.dijkstra(s_x, s_y, e_x, e_y);
        // if (this.state.e_x || this.state.e_y) {
        //     this.setState({ e_x: Infinity, e_y: Infinity });
        //     return;
        // }
    }

    render() {
        let disabled = this.state.e_x == Infinity;
        return (
            <div className="container">
               <div>
                    <div className="graph" onClick={(e) => this.pickNode(e)}>
                        { this.state.graph.map((arr, i) => {
                            return arr.map(({visited, parent, inPath, wall, weight}, j) => {
                                let classname;
                                weight = this.state.searchType != 'dijkstra' ? ' ' : weight
                                switch (visited) {
                                    case -1:
                                        classname = 'finish';
                                        break;
                                    case -2:
                                        classname = 'start';
                                        break;
                                    case 0:
                                        classname = 'unvisited';
                                        break;
                                    case 1:
                                        classname = 'visited'
                                        break;
                                    default:
                                        break;
                                }
                                if (inPath) classname += ' inPath';
                                if (wall) classname += ' wall';
                                return <Vertex key={i + j} x={i} y={j} className={classname} weight={weight} />
                            })
                        }) }                
                    </div>
                    <div className="buttonContainer">
                        
                        <button value="bfs" className="runButton" onClick={this.runBFS} disabled={disabled}>BFS</button>
                        <button value="dfs" className="runButton" onClick={this.runDFS} disabled={disabled}>DFS</button>
                        <button value="dijkstra" className="runButton" onClick={this.runDijkstra} disabled={disabled}>Dijkstra</button>
                        <button className="runButton" onClick={this.generateGraph}>Reset</button> 
                    </div> 
               </div>  
            </div>
            
        )
    }
}

export default Graph;