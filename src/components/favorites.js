/*  This class shows the list of favorite
    cities from the localStorage and calls
    weather forecast by clicking on a specific
    cityname */

import React from 'react';
import styles from './favorites.css';

export default class Form extends React.Component{
    constructor(props){
        super(props);

        // get favorites from app.js
        this.state = {
            favorites: this.props.favorites
        };
    }

    favoriteSelected (value){
        this.props.setCity(value);
    } 


    renderFavorites(){
        const {favorites} = this.state;

        if(favorites.length === 0){
            return null;
        }
        
        return(
            <ul className={styles.list}>{favorites.map((item) => 
                <li> <button className={styles.button} onClick={() => {this.favoriteSelected(item)}} > 
                {item} 
                </button> </li>)}
            </ul>
        );
    }

    render() {
        // check if there are favorites in localStorage and return them
        if (this.state.favorites !== null) {
            return(
                <div>
                <form onSubmit={this.props.findWeather}>
                    {this.renderFavorites()} 
                    <input value={this.props.city} type="hidden"/>
                </form>
                </div>
            )
        } else{
            return null
        }
    }
}
