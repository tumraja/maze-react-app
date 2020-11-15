import React  from 'react';
import { Link } from "react-router-dom";
import './Game.css';
import { GameControl } from "./control/GameControl";
import { GameFormInput } from "./form/GameFormInput";
import { GameIntro } from "./intro/GameIntro";
import { createMaze, getMaze, move, printMaze } from "../service/service";
import { getDirectionByKeyCode } from "../getDirectionByKeyCode";
import { determineAllPossiblePositions, getDirections } from "../service/agent-service";

const BASEURL = 'https://ponychallenge.trustpilot.com';
const DEFAULT_STATE = {
    ponyName: 'Cheerilee',
    mazeWidth: 20,
    mazeHeight: 15,
    level: 1,
    maze: null,
    data: null,
    mazeId: null,
    status: 'InActive',
    message: '',
    url: ''
};

export class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = DEFAULT_STATE;

        this.handlePonyNameChange = this.handlePonyNameChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.resetState = this.resetState.bind(this);
        this.createGame = this.createGame.bind(this);
        this.runtAgent = this.runtAgent.bind(this);
        this.movePony = this.movePony.bind(this);
    }

    handlePonyNameChange(ponyName) {
        this.setState({ponyName: ponyName});
    }

    handleHeightChange(height) {
        this.setState({mazeHeight: height});
    }

    handleWidthChange(width) {
        this.setState({mazeWidth: width});
    }

    handleKeyPress(event) {
        if (this.isGameActive() && getDirectionByKeyCode(event.keyCode)) {
            const direction = getDirectionByKeyCode(event.keyCode);
            this.movePony(direction).then(() => {});
        }
    }

    resetState() {
        this.setState(DEFAULT_STATE);
    }

    restartGame() {
        this.startGame();
    }

    isGameActive() {
        return this.state.status.toLowerCase() === 'active';
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress, false);
    }

    createGame() {
        if (this.checkWidthAndHeight() && this.isLevelValid()) {
            this.startGame();
        } else {
            alert('Fill in the fields correctly');
        }
    }

    startGame() {
        createMaze(this.state).then((data) => {
            if (data['maze_id']) {
                const mazeId = data['maze_id'];
                getMaze(mazeId).then((data) => {
                    const gameState = data['game-state'];
                    this.setState({data: data, mazeId: mazeId, status: gameState.state, message: gameState['state-result']})
                });

                printMaze(mazeId).then((maze) => {
                    this.setState({maze: maze});
                });
            } else {
                alert(data);
            }
        }).catch(err => alert(err));
    }

    isLevelValid() {
        return this.state.level >= 0;
    }

    checkWidthAndHeight() {
        return (this.state.mazeWidth >= 15 && this.state.mazeWidth <= 25) && (this.state.mazeHeight >= 15 && this.state.mazeHeight <= 25);
    }

    async movePony(direction) {
        let url = null;
        const moveState = await move(direction, this.state.mazeId);
        if (moveState['hidden-url']) {
            url = `${BASEURL}${moveState['hidden-url']}`;
        }

        const print = await printMaze(this.state.mazeId);
        this.setState({maze: print, status: moveState.state, message: moveState['state-result'], url: url});
    }

    runtAgent() {
        const ponyPosition = this.state.data.pony[0];
        const mazeEndPoint = this.state.data['end-point'][0];
        const mazeData = this.state.data.data;
        const mazeHeight = this.state.data.size[1];
        const mazeWidth = this.state.data.size[0];
        const visitedPositions = [ponyPosition]; // Assume the current position is already visited
        const markedPositions = [ponyPosition]; //Mark the current position
        const possiblePositionsToReachTheGoal = [];

        while (markedPositions.length > 0) {
            const nextPosition = markedPositions.shift(); //Unmark the last position

            if (nextPosition === mazeEndPoint) {
                return this.resolveDirectionsAndMakeMove(nextPosition, ponyPosition, mazeEndPoint,  possiblePositionsToReachTheGoal);
            }

            determineAllPossiblePositions(nextPosition, mazeWidth, mazeData, visitedPositions, markedPositions, possiblePositionsToReachTheGoal, mazeHeight);
        }
    }

    async resolveDirectionsAndMakeMove(currentPosition, ponyPosition, goalPosition, possiblePositions) {
        const directions = getDirections(currentPosition, ponyPosition, goalPosition,  this.state.data.size[0], possiblePositions);
        for (let direction of directions) {
            if (!this.isGameActive()) return;
            await this.movePony(direction);
        }
    }

    render() {
        const maze = this.state.maze;
        const status = this.state.status;
        const message = this.state.message;
        const url = this.state.url;
        const defaultMazeParams = this.state;

        if (status === 'InActive') {
            return (
                <div className="PlayGame">
                    <div className="Game">
                        <GameIntro />
                        <div className="Game__input">
                            <GameFormInput type={'text'} name={'pony'} paramValue={defaultMazeParams.ponyName} onParamsChange={this.handlePonyNameChange}/>
                            <GameFormInput type={'number'} name={'mWidth'} paramValue={defaultMazeParams.mazeWidth} onParamsChange={this.handleWidthChange}/>
                            <GameFormInput type={'number'} name={'mHeight'} paramValue={defaultMazeParams.mazeHeight} onParamsChange={this.handleHeightChange}/>
                        </div>
                        <button type="submit" className="Game__button" onClick={this.createGame}>Create new maze game</button>
                        <Link to="/" className="Game__button">Home</Link>
                    </div>
                </div>
            );
        } else if (this.isGameActive()) {
            return (
                <div className="PlayGame">
                    <div className="PlayGame-control">
                        <GameControl direction={'west'} icon={'arrow_back'} onMoveChange={this.movePony} />
                        <GameControl direction={'north'} icon={'arrow_upward'} onMoveChange={this.movePony} />
                        <GameControl direction={'south'} icon={'arrow_downward'} onMoveChange={this.movePony} />
                        <GameControl direction={'east'} icon={'arrow_forward'} onMoveChange={this.movePony} />
                    </div>

                    <button className="PlayGame-restart" onClick={this.runtAgent}>Run Agent</button>

                    <div className="PlayGame-maze">
                        <p>(P: Pony) - (D: Domokun / Monster) - (E: Exit/End)</p>
                        <pre>{maze}</pre>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="PlayGame">
                    <div>{message}</div>
                    <div>
                        <img alt="Pony and Domokun" className="PlayGame-image" src={url} />
                    </div>
                    <button type="submit" className="Game__button" onClick={this.resetState}>Create new maze game</button>
                </div>
            );
        }
    }
}
