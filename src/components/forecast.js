/*  This class shows the second view of the weather 
    application (forecast of a specific weather) */

import React, { Component } from 'react';
import styles from './weather.css';


export default class Forecast extends Component {
    
    render() {

        var forecastData = this.props.forecast;  
        var dayNight = 'n';

        var mydates = [
            new Date(forecastData[8].dt_txt),
            new Date(forecastData[16].dt_txt),
            new Date(forecastData[24].dt_txt),
            new Date(forecastData[32].dt_txt)
        ];        


        // Formatter for the day-string
        function dayFormatter(date){

            var dayNumber = date.getDay();
            var dayString = -1;

            switch(dayNumber){
                case 0:
                    dayString = 'Sunday';
                    break;
                case 1:
                    dayString = 'Monday';
                    break;
                case 2:
                    dayString = 'Tuesday';
                    break;
                case 3:
                    dayString = 'Wednesday';
                    break;
                case 4:
                    dayString = 'Thursday';
                    break;
                case 5:
                    dayString = 'Friday';
                    break;
                case 6:
                    dayString = 'Saturday';
                    break;
                default:
                    -1;
                    break;
            }
            
            return dayString;
        }

        // Formatter for the time-string
        function timeFormatter(date){

            var hourString = date.getHours();
            var minuteString = date.getMinutes();
            
            // Hours
            if (hourString >= 0 && hourString <= 9) {
                hourString = '0' + hourString;
            }

            // Minutes
            if (minuteString >= 0 && minuteString <= 9) {
                minuteString = '0' + minuteString;
            }

            // Build final time-string (hh:mm)
            return hourString + ':' + minuteString;
        }

        // Day/night calculation for correct icons
        function dayOrNight (){
            if (mydates[0].getHours() >= 0 && mydates[0].getHours() <= 6){
                dayNight = 'n';
            } else if (mydates[0].getHours() >= 18 && mydates[0].getHours() <= 23)  {
                dayNight = 'n';
            } else {
                dayNight = 'd';
            }
            return dayNight;
        }

        
        // Icons-array (using owfont)
        var weatherIcons = [
            'owf owf-' + forecastData[0].weather[0].id + '-' + dayOrNight(),
            'owf owf-' + forecastData[8].weather[0].id + '-' + dayNight,
            'owf owf-' + forecastData[16].weather[0].id + '-' + dayNight,
            'owf owf-' + forecastData[24].weather[0].id + '-' + dayNight,
            'owf owf-' + forecastData[32].weather[0].id + '-' + dayNight
        ];
        
        // TODO: Clean up here.
        return (
            
            <div>
                <p></p>
                               
                    <button className={styles.button} onClick={this.props.goHome}>
                    BACK
                    </button>

                    <button className={styles.button} onClick={this.props.storeButton}>
                    {this.props.buttontext}
                    </button>

                <p></p>

                <div className={styles.location}> 
                    { this.props.city && this.props.country && <p>{ this.props.city }, { this.props.country }</p>}
                </div>

                <div className={styles.temperature}>
                    { this.props.temperature && <p>{ this.props.temperature } °C</p>}
                </div>
                <div className={styles.description}>
                    <i className={weatherIcons[0] + ' owf-4x'}></i>
                </div>

                    <div className={styles.forecasttable}>
                        <table>
                            <tr>
                                <th>Day</th>
                                <th>Time</th>
                                <th>Temp.</th>
                                <th></th>  
                                <th>Wind</th>
                            </tr>
                            <tr>
                                <td>{dayFormatter(mydates[0])}</td>
                                <td>{timeFormatter(mydates[0])}</td>
                                <td>{forecastData[8].main.temp} °C</td> 
                                <td><i className={weatherIcons[1] + ' owf-2x'}></i></td>
                                <td>{forecastData[8].wind.speed} m/s</td>
                            </tr>
                            <tr>
                                <td>{dayFormatter(mydates[1])}</td>
                                <td>{timeFormatter(mydates[1])}</td>
                                <td>{forecastData[16].main.temp} °C</td>
                                <td><i className={weatherIcons[2] + ' owf-2x'}></i></td>
                                <td>{forecastData[16].wind.speed} m/s</td>
                            </tr>
                            <tr>
                                <td>{dayFormatter(mydates[2])}</td>
                                <td>{timeFormatter(mydates[2])}</td>
                                <td>{forecastData[24].main.temp} °C</td> 
                                <td><i className={weatherIcons[3] + ' owf-2x'}></i></td>
                                <td>{forecastData[24].wind.speed} m/s</td>
                            </tr>
                        </table>   
                    </div>  
            </div>  
        )
    }
}
        // FIRST TRY WITH BUTTONS...
        /* Store into localStorage
        // this didn't work without jQuery, because the onClick-event didn't work properly
        $(document).on('click', '.store', function() {
            window.localStorage.setItem(city, city + ", " + country);
        })

        // Remove item from localStorage
        $(document).on('click', '.remove', function() {
            window.localStorage.removeItem(city);
        }) */