import React, { Component } from 'react';
import axios from 'axios';
import IconTabs from './Tabs';

const user = null;
class Leaders extends Component {
  state = {
    patsScore: '',
    ramsScore: '',
    time: '',
    addSq: '',
    initials: ''
  }

  handleOnChange = (event)=>{
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleUpdateScore = ()=>{
    const {time, patsScore, ramsScore} = this.state;
    if(time !== '' && patsScore !== '' && ramsScore !== ''){
       const scores = [patsScore, ramsScore];

    axios.post('http://localhost:5000/game/updateScores', {score: scores, time: this.state.time}).then(res=>{
      console.log('updated', res.data);
    });
    }
   
  }

    handleAddSq = ()=>{
    const {addSq, initials} = this.state;
    if(addSq !== ''){
      const user = {initials, addSq}
    axios.post('http://localhost:5000/user/addSquare', user).then(res=>{
      alert(res.data);
    });
    }
   
  }

  handleSignout = ()=>{
    localStorage.removeItem('user');
    this.props.history.push('/login');
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
      this.props.history.push('/signup');
    }
    return (
      <div style={styles.root}>
        {/* ADMIN SECTION  */}
        {user.admin ? 
        <div style={styles.admin}>
          {/* UPATE SCORES */}
          <div className="borderGray pad5">
            <div>Make sure to enter both score</div>
            <div className="flex center pad5">
              <div>
                <div>Patriots Score*</div>
                <input style={styles.input} name="patsScore" value={this.state.patsScore} placeholder="Enter score" onChange={this.handleOnChange}/>
              </div>
              <div>
                <div>Rams Score*</div>
                <input style={styles.input} name="ramsScore" value={this.state.ramsScore} placeholder="Enter score" onChange={this.handleOnChange}/>
              </div>
            </div>
            <div>Time*</div>
                <input style={styles.input} name="time" value={this.state.time} placeholder="Enter time" onChange={this.handleOnChange}/>
            <button style={styles.button} onClick={this.handleUpdateScore}>Update Scores</button>
          </div>
          {/* END UPDATE SCORES */}
          {/* UPDATE AVAILABLE PICKS */}
          <div className="borderGray pad5">
            Update user's availabe pick
            <div>User initials</div>
            <input style={styles.input} name="initials" value={this.state.initials} placeholder="Enter initials" onChange={this.handleOnChange}/>
            <div>Add how many more squares?</div>
            <input style={styles.input} name="addSq" value={this.state.addSq} placeholder="Enter number" onChange={this.handleOnChange}/>
            <button style={styles.button} onClick={this.handleAddSq}>Add Squares</button>
          </div>

        </div> : null}
        {/* END ADMIN SECTION */}

        <div onClick={this.handleSignout}>Sign out</div>
        Leader board
      </div>
    );
  }
}

const styles = {
  input: {
    fontSize: 17,
    padding: 5,
    width: '60%'
  },
  button: {
    fontSize: 20,
    padding: '5px 10px'
  }
}

export default Leaders;
