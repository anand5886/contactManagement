import React, { Component } from 'react';
export class Logout extends Component {
    componentDidMount() {
        localStorage.clear();
        this.props.history.push('/'); /*Redirect to log in page*/
    }
    render() {  
        return (
            <div> </div>
        )
    }
}
