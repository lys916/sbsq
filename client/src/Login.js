import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component {
  state = {
    initials: '',
    password: '',
    error: null
  }

  handleOnChange = (event)=>{
    if(event.target.name === 'initials'){
      this.setState({
        [event.target.name]: event.target.value.toUpperCase()
      });
    }else{
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

    handleLogin = ()=>{
  
      axios.post('/user/login', this.state).then(res=>{
      if(res.data.error){
        this.setState({error: res.data.errorType});
      }else{
        localStorage.setItem('user', JSON.stringify(res.data));
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
        this.props.history.push('/signup');
      }else{
        this.props.history.push('/squares');
      }
      }
      
    });
  }

  render() {
    return (
      <div style={styles.root}>
        <div style={{paddingTop: 20}}>SUPER BOWL SQUARES</div>
        <form style={styles.form}>
          <div style={styles.label}>Your Initials</div>
          
          {this.state.error === 'initials' ? <div style={{color: 'red', fontSize: 12, textAlign: 'left'}}>This initials does not exist</div> : null}

          <input name="initials" value={this.state.initials} onChange={this.handleOnChange} style={styles.input}/><br/>

          <div style={styles.label}>Password</div>
          {this.state.error === 'password' ? <div style={{color: 'red', fontSize: 12, textAlign: 'left'}}>Wrong password</div> : null}

          <input name="password" value={this.state.password} onChange={this.handleOnChange} style={styles.input}/>

        </form>
        <button onClick={this.handleLogin} style={styles.button}>Login</button>
        <div>Don't have an account?  <span onClick={()=>{this.props.history.push('/signup')}}>Signup!</span></div>
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

export default Login;
