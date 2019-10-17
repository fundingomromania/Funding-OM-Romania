import React, {Component} from 'react';

export default class ComingSoon extends Component {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    };

    

    componentDidMount() {
        this.interval = setInterval(() => {
        const countDownDate = new Date("Oct 18, 2019 15:00:00").getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.setState({ days, hours, minutes, seconds });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render () {
        const { days, hours, minutes, seconds } = this.state

        const image = {
            width: '50px',
            textAlign: 'center',
            display: 'block',
            margin: 'auto'
          }
          
          const container = {
            margin: 'auto',
            fontFamily: "Segoe UI",
            fontWeight: '700'
          }
          
          const text = {
            textAlign: 'center',
            color: '#D22630',
            paddingTop: '150px'
          }
          
        const textSecond = {
            textAlign: 'center',
            color: '#D22630'
          }

        return (
            <div style={container}>
            <a href="#"><img src="img/logo.jpg" style={image} alt="" /></a>
            <h3 style={text}>Welcome! Get ready...</h3>
            <h3 style={textSecond}>Funding OM Romania will launch in:</h3>
            <h3 style={textSecond}> {days} days {hours} hours {minutes} minutes {seconds} seconds</h3>
          </div>
        )
    }
}
