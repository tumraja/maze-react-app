import React  from 'react';
import { Link } from "react-router-dom";
import './Game.css';
import { GameControl } from "./control/GameControl";
import { GameFormInput } from "./form/GameFormInput";
import { GameIntro } from "./intro/GameIntro";
import { createMaze, getMaze, move, printMaze } from "../service/service";
import { getDirectionByKeyCode } from "../getDirectionByKeyCode";

const BASEURL = 'https://ponychallenge.trustpilot.com';
export class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ponyName: 'Cheerilee',
            width: 20,
            height: 15,
            level: 1,
            maze: null,
            mazeId: null,
            status: 'InActive',
            message: '',
            url: ''
        };

        this.handlePonyNameChange = this.handlePonyNameChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.resetState = this.resetState.bind(this);
        this.createGame = this.createGame.bind(this);
        this.move = this.move.bind(this);
    }

    handlePonyNameChange(ponyName) {
        this.setState({ponyName: ponyName});
    }

    handleHeightChange(height) {
        this.setState({height});
    }

    handleWidthChange(width) {
        this.setState({width});
    }

    handleKeyPress(event) {
        if (this.isGameActive() && getDirectionByKeyCode(event.keyCode)) {
            const direction = getDirectionByKeyCode(event.keyCode);
            this.move(direction);
        }
    }

    resetState() {
        this.setState({maze: null, mazeId: null, status: 'InActive', message: '', url: ''});
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
                    this.setState({mazeId: mazeId, status: gameState.state, message: gameState['state-result']})
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
        return (this.state.width >= 15 && this.state.width <= 25) && (this.state.height >= 15 && this.state.height <= 25);
    }

    move(direction) {
        move(direction, this.state.mazeId).then((data) => {
            let url = null;
            if (data['hidden-url']) {
                url = `${BASEURL}${data['hidden-url']}`;
            }

            printMaze(this.state.mazeId).then((maze) => {
                this.setState({maze: maze, status: data.state, message: data['state-result'], url: url});
            });
        })
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
                            <GameFormInput type={'number'} name={'mWidth'} paramValue={defaultMazeParams.width} onParamsChange={this.handleWidthChange}/>
                            <GameFormInput type={'number'} name={'mHeight'} paramValue={defaultMazeParams.height} onParamsChange={this.handleHeightChange}/>
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
                        <GameControl direction={'west'} icon={'arrow_back'} onMoveChange={this.move} />
                        <GameControl direction={'north'} icon={'arrow_upward'} onMoveChange={this.move} />
                        <GameControl direction={'south'} icon={'arrow_downward'} onMoveChange={this.move} />
                        <GameControl direction={'east'} icon={'arrow_forward'} onMoveChange={this.move} />
                    </div>

                    <span className="PlayGame-keyboard"><i className="material-icons">keyboard</i></span>

                    <button className="PlayGame-restart" onClick={this.restartGame}>Restart</button>

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
