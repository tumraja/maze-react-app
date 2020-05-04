import React from 'react';
import './GameFormInput.css'

export class GameFormInput extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onParamsChange(event.target.value);
    }

    render() {
        const value = this.props.paramValue;
        const type = this.props.type;
        const name = this.props.name;
        return (
            <div>
                <input type={type}
                       value={value}
                       name={name}
                       onChange={this.handleChange}/>
            </div>
        );
    }
}
