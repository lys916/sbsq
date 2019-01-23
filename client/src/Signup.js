import React, { Component } from 'react';
import axios from 'axios';


class Signup extends Component {
  state = {
    name: '',
    initials: '',
    password: '',
    error: null,
    message: ''
  }

  handleOnChange = (event)=>{
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSignup = ()=>{
    const {name, initials, password} = this.state;
    // INPUT ERROR HANDLING

  if(name === ''){
      this.setState({
        error: 'name',
        message: 'Full name is required'
      });
    }
    else if(name.length < 2){
      this.setState({
        error: 'name',
        message: 'Full name is too short'
      });
    }
    else if(initials === ''){
      this.setState({
        error: 'initials',
        message: 'initials is required'
      });
    }
    else if(initials.length > 3){
      this.setState({
        error: 'initials',
        message: 'initials must be 2-3 characters'
      });
    }
    else if(initials.length < 2 ){
      this.setState({
        error: 'initials',
        message: 'initials must be 2-3 characters'
      });
    }
    else if(password === ''){
      this.setState({
        error: 'password',
        message: 'Password is required'
      });
    }
    else if(password.length < 2){
      this.setState({
        error: 'password',
        message: 'Password is too short'
      });
    }
    else{
      axios.post('http://localhost:5000/user/signup', this.state).then(res=>{
        localStorage.setItem('user', JSON.stringify(res.data));
        const user = JSON.parse(localStorage.getItem('user'));

        if(!user){
          this.props.history.push('/signup');
        }else{
          this.props.history.push('/squares');
        }
      });
    }
      
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user', user);
    if(user){
      this.props.history.push('/squares');
    }
    return (
      <div style={styles.root}>
        <div>SUPER BOWL SQUARES</div>
        <form style={styles.form}>
        <div style={styles.label}>Your Full Name</div>

        {this.state.error === 'name' ? <div style={{color: 'red', fontSize: 12, textAlign: 'left'}}>{this.state.message}</div> : null}

        <input name="name" value={this.state.name} onChange={this.handleOnChange} style={styles.input}/>
          <div style={styles.label}>Your Initials (2-3 letters)</div>
          {this.state.error === 'initials' ? <div style={{color: 'red', fontSize: 12, textAlign: 'left'}}>{this.state.message}</div> : null}

        <input name="initials" value={this.state.initials} onChange={this.handleOnChange} style={styles.input}/>
          <div style={styles.label}>Password</div>
          {this.state.error === 'password' ? <div style={{color: 'red', fontSize: 12, textAlign: 'left'}}>{this.state.message}</div> : null}

        <input name="password" value={this.state.password} onChange={this.handleOnChange} style={styles.input}/><br/>
        </form>
        <button onClick={this.handleSignup} style={styles.button}>Sign Up</button>
        <div>Already have an account? <span onClick={()=>{this.props.history.push('/login')}}>Login!</span></div>
      </div>
      
      
    );
  }
}

const styles = {
  root: {
    textAlign: 'center',
  },
  form: {
    width: '70%',
    margin: '20px auto'
  },
  label: {
    textAlign: 'left',

    width: '100%'
  },
  input: {
    width: '100%',
    fontSize: 22,
    padding: '5px 2px',
    border: '1px solid #dedede',
    borderRadius: 5
  },
  button: {
    fontSize: 18,
    padding: '4px 13px',
    background: '#dedede',
    border: '1px solid #bbbbbb'
  }
}

export default Signup;
