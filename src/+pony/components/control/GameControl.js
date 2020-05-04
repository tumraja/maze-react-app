import React from "react";

export class GameControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleMove = this.handleMove.bind(this);
    }

    handleMove(direction) {
        this.props.onMoveChange(direction);
    }

    render() {
        const direction = this.props.direction;
        const icon = this.props.icon;

        return(
            <div className="PlayGame-control">
                <button onClick={() => this.handleMove(direction)}><i className="material-icons">{icon}</i></button>
            </div>
        );
    }
}
