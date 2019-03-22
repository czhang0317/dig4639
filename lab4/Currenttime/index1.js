
import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native';

class Currenttime extends Component<{}>
{
    constructor()
    {
        super();

        this.state = { currentTime: null, currentDay: null }
    }

    componentWillMount()
    {
        this.getCurrentTime();
    }

    getCurrentTime = () =>
    {
        let hour = new Date().getHours();
        let minutes = new Date().getMinutes();
        let seconds = new Date().getSeconds();
        let am_pm = 'pm';

        if( minutes < 10 )
        {
            minutes = '0' + minutes;
        }

        if( seconds < 10 )
        {
            seconds = '0' + seconds;
        }

        if( hour > 12 )
        {
            hour = hour - 12;
        }

        if( hour == 0 )
        {
            hour = 12;
        }

        if( new Date().getHours() < 12 )
        {
            am_pm = 'am';
        }

        this.setState({ currentTime: hour + ':' + minutes + ':' + seconds + ' ' + am_pm });

    }

    componentWillUnmount()
    {
        clearInterval(this.timer);
    }

    componentDidMount()
    {
        this.timer = setInterval(() =>
        {
            this.getCurrentTime();
        }, 1000);
    }

    render()
    {
        return(
            <View style = { styles.container }>
                <View>
                    <Text style = { styles.timeText }>{ this.state.currentTime }</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
{

    timeText:
    {
        fontSize: 50,
        color: '#e59400'
    },


});

export default Currenttime;
