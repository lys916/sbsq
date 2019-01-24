import React, { Component } from 'react';
import axios from 'axios';


class ScoreBoard extends Component {
  state = {
    name: '',
    initials: '',
    password: ''
  }

  handleOnChange = (event)=>{
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSignup = ()=>{
  
      axios.post('/user/signup', this.state).then(res=>{
      localStorage.setItem('user', JSON.stringify(res.data));
      const user = JSON.parse(localStorage.getItem('user'));

      if(!user){
        this.props.history.push('/signup');
      }else{
        this.props.history.push('/squares');
      }
    });
  }

  render() {
    // const user = JSON.parse(localStorage.getItem('user'));
    // console.log('user', user);
    // if(user){
    //   this.props.history.push('/squares');
    // }
    return (
      <div style={styles.root}>
        <div style={styles.road}>
            <span style={styles.scoreName}>NE</span>
            <span style={styles.score}>{this.props.score[0]}</span>
        </div>
        <div style={styles.time}>{this.props.time}</div>
        <div style={styles.home}>
            <span style={styles.scoreName}>LAR</span>
            <span style={styles.score}>{this.props.score[1]}</span>
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    color: 'white',
    width: '100vw',
    justifyContent: 'space-between'
  },
  time: {
      background: '#0c275b',
      fontSize: '3vw',
      width: '20%',
      paddingTop: 5
  },
  road: {
    background: '#002244',
    width: '40%',
    fontSize: '4.5vw',
    padding: '2px 0px'
  },
  home: {
    background: '#0f2D72',
    fontSize: '4.5vw',
    width: '40%',
    padding: '2px 0px'
  },
  scoreName: {
    borderRight: '2px solid gray',
    borderRadius: 50,
    paddingRight: 10,
  },
  score: {
      paddingLeft: 10
  },
  input: {
    width: '100%',
    fontSize: 22,
    padding: '5px 2px',
    border: '1px solid #dedede',
    borderRadius: 5
  }
}

export default ScoreBoard;
