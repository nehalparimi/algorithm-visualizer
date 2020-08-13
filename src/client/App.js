import React, { Component } from 'react';

export default class App extends Component {
    state = { username: null };

    componentDidMount() {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({username: user.username}));
    }

    render() {
        const { username } = this.state;
        return(
            <div>
                { username ? <p>Hello {username}</p> : <p>Hello nameless person</p>}
            </div>
        )
    }
}