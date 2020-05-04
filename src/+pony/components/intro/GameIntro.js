import React from "react";

export class GameIntro extends React.Component {
    render() {
        return(
            <div className="Game-intro">
                <h1 className="Game-primary">
                    <span className="Game-primary--main">Create a new Maze game</span>
                </h1>
                <details className="Game-details">
                    <summary>Important information</summary>
                    <p>- By default, PonyName, Width, Height has been filled. More options 👇</p>
                    <p>- Some valid pony names <strong>(Derpy Hooves/ Cheerilee / Twilight Sparkle / Apple Bloom)</strong></p>
                    <p>- Valid Maze width & height <strong>(dimensions 15 to 25)</strong></p>
                </details>
            </div>
        );
    }
}
