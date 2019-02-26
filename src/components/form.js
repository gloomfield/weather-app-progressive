/*  This class creates the form on the home-screen
    where you can search through a list of different
    cities in the world to get a specific weather forecast */

import React from 'react';
import CityData from './city.list.json';
import styles from './form.css';


export default class Form extends React.Component{
    constructor(props){
        super(props);

        // Loading city-names into items-Array (including Country (e.g. "AT"))
        this.citiesArray_dirty = CityData.map((cityDetail, index) => {
            return cityDetail.name + ', ' + cityDetail.country;
        });

        // Remove duplicates from array function
        function remove_duplicates_es6(arr) {
            let s = new Set(arr);
            let it = s.values();
            return Array.from(it);
        }

        // clean up city-array
        this.citiesArray = remove_duplicates_es6(this.citiesArray_dirty);


        // initialize state
        this.state = {
            suggestions: [],
            textfield: ''
        };  


    }

    
    // if user types/has not typed something to the texfield
    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            // test for matches in items list and sort it with reg expression
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.citiesArray.sort().filter(v => regex.test(v));
        }

        this.setState(() => ({ 
            suggestions,
            textfield: value
        }));
    }

    // set selected city as new city state and clear suggestion-list
    suggestionSelected (value){
        this.setState(() => ({
            suggestions: [],
            textfield: value
        }))
        this.props.setCity(value);
    }

    renderSuggestions(){
        // destructuring suggestions from state
        const {suggestions} = this.state;

        // if there are no suggestions...
        if(suggestions.length === 0){
            return null;
        }

        // render suggestion-list
        return(
            <ul className={styles.list}>
                {suggestions.map((item) => 
                <li className={styles.list} onClick={() => this.suggestionSelected(item)}> 
                {item} 
                </li>)}
            </ul>
        );
    }

    render() {

        return(
            <div className={styles.FormText} >
            <form onSubmit={this.props.findWeather}>
                <input value={this.state.textfield} onChange={this.onTextChanged} autocomplete="off"/>
                {this.renderSuggestions()} 
                <p>
                    <button className={styles.button}>Find weather</button>
                </p>
            </form>
            </div>
        )
    }
}
