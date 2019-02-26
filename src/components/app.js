/*  This is the main-class of the application
    which is rendering all the shown data on the screen.
    The class works also as a controller. */

import React, { Component } from 'react';

import Titles from './titles';
import Form from './form';
import Forecast from './forecast';
import Favorites from './favorites';

// api key from openweathermap.com
const WEATHERMAP_KEY = "0e58ee30379ddf9c24f5e845e4b20142";

const _ = require('lodash');

// load favorite cities from localStorage
let favorites  = [];
favorites = JSON.parse(localStorage.getItem('favs'));

export default class App extends Component{

    // initialize the state
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        description: undefined,
        forecast: undefined,
        favorites: favorites,
        view: 'siteHome',
        error: undefined,
        buttontext: ''
    }
        
    //using fetch api for the getWeather-function
    getWeather = async (e) => {
        e.preventDefault();  // prevents the default-behaviour on click on button
        
        // get name of selected city (user's choice from form/favorites.js)
        const city = this.state.city;

        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHERMAP_KEY}&units=metric`);
        
        const api_call_forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHERMAP_KEY}&units=metric`);
        
        // convert data to readable format
        const data = await api_call.json(); 
        const data_forecast = await api_call_forecast.json(); 
        
        if(city){
            // set Buttontext at Forecast-Site
            var favs = this.state.favorites;
            if(favs !== null && favs.length > 0){
                var match = false;
                for(var i = 0; i < favs.length; i++){
                    if(favs[i] === city){
                        this.setState({
                            buttontext: 'REMOVE'
                        });
                        match = true;
                        break;
                    }
                }
                if(!match){
                    this.setState({
                        buttontext: 'SAVE'
                    });
                }
            } else {
                this.setState({
                    buttontext: 'SAVE'
                });
            }
            // set state at forecast site an go to site
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                description: data.weather[0].description,       // description contained in an object
                forecast: data_forecast.list,
                view: 'siteForecast',
                error: ' '
            });

            // else: set everything back to undefined
        } else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                description: undefined,      
                error: 'No Values entered.'
            });
        }
    }

    // set city-state to selected city (from form.js & favorites.js)
    setCityState = (selectedCity => {
        this.setState({
            city: selectedCity
        })
    }) 

    // Go back home from forecast site
    changeSite = async (e) => {
        e.preventDefault(); 
        this.setState({view: 'siteHome'});  
    }

    // LocalStorage
    // STORE/REMOVE city names (called by forecast.js)
    storeOrDelete = async (e) => {
        
        var favs = this.state.favorites;
        var match = false;

        // Wenn favoriten im localStorage...
        if(favs !== null && favs.length > 0){
            console.log("NOTNULL: favs = " + favs + ", LENGTH = " + favs.length + ", this.state.city = " + this.state.city);
            
            //...dann alle favoriten anschauen...
            for (var i = 0; i < favs.length; i++){
                console.log("FOR [i]=" + i + ", favs[i]=" + favs[i]);
                // ...und wenn einer gleich ist wie stadtname...
                if(favs[i] === this.state.city){
                    console.log("SPLICE. favs[i]=" + favs[i] + ", i=" + i +", this.city.state=" + this.state.city);
                    favs.splice(i, 1);
                    match = true;
                    break;
                }
            }
            if(!match){
                //...wenn stadtname noch nicht vorhanden war...
                console.log("PUSH. this.state.city=" + this.state.city);
                favs.push(this.state.city);
            }
            
        } else {
            console.log("NULL OR ARRAY: favs === null. favs = " + favs + ", this.state.city=" + this.state.city);
            favs = [this.state.city];
        }
        localStorage.setItem('favs', JSON.stringify(favs));

        this.setState({
            favorites: favs
        })

        // update buttontext
        if(this.state.buttontext === 'SAVE'){
            this.setState({
                buttontext: 'REMOVE'
            })
        } else {
            this.setState({
                buttontext: 'SAVE'
            })
        }
    }

    // add Props to Form (getWeather) to get access  to the getWeather-function in form.js-file
    render(){

        if (this.state.view === 'siteHome') {
            return( 
            <div>
                <Titles />
                <Form 
                    city={this.state.city} 
                    favorites={this.state.favorites}
                    setCity={this.setCityState} 
                    findWeather={this.getWeather}/>
                <Favorites 
                    city={this.state.city} 
                    favorites={this.state.favorites}
                    setCity={this.setCityState} 
                    findWeather={this.getWeather}/>
            </div>);
        } else {
            return( <div>
                <Forecast
                    goHome={this.changeSite}
                    storeButton={this.storeOrDelete}
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    forecast={this.state.forecast}
                    favorites={this.state.favorites}
                    buttontext={this.state.buttontext}
                />
            </div>
            );
        }
    }
}