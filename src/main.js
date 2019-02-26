import React from "react";
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(<App />, document.getElementById("start"));

function component(){
    let element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work (INFO!)
   // element.innerHTML = _.join(['webpack', 'test'], ' ');
    console.log("WOS ISN LEICHT");
    return element;
}


document.body.appendChild(component());