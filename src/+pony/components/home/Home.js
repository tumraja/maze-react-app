import React from 'react';
import './Home.css';

export class Home extends React.Component {
    render() {
        return (
            <div className="Home">
                <div className="Home__text-box">
                    <h1 className="Home-primary">
                        <span className="Home-primary--main">Help to save the pony</span>
                        <span className="Home-primary--sub">from the Domokun</span>
                    </h1>
                    <a href="/game" className="btn btn--white btn--animated">Create new maze game</a>
                </div>
            </div>
        );
    }
}
