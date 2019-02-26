import React from 'react';

export default class HideableText extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isHidden: false,
        }
    }

    toggleIsHidden(){
        // returns changes which we want to make to object
        this.setState((currentState) => ({
            isHidden: !currentState.isHidden,
        }));
    }

    render(){
        return(
        <div>
            <button onClick={() => this.toggleIsHidden()}>Toggle</button>
            {!this.state.isHidden && this.props.text}
        </div>
        )
    }

}