import React, { Component } from 'react';
import axios from 'axios';
import IconTabs from './Tabs';

const Nums = [0, 1, 2, 3, 4, 5, 6, 7 , 8, 9]; 

const user = null;
class Admin extends Component {
  state = {
    patsScore: '',
    ramsScore: '',
    time: '',
    addSq: '',
    initials: '',
    ramsNum: [],
    patsNum: [],
    time: '', 
    score: ''
  }

  componentDidMount(){
   
    axios.get('/game').then(res=>{
     
      const {squares, ramsNum, patsNum, time, score} = res.data;
      this.setState({
        ramsNum,
        patsNum,
				score,
				time,
        patsScore: score[0],
        ramsScore: score[1]
      })
    });
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

    axios.post('/game/updateScores', {score: scores, time: this.state.time}).then(res=>{
      alert(res.data);
    });
    }
   
  }

    handleAddSq = ()=>{
    const {addSq, initials} = this.state;
    if(addSq !== ''){
      const user = {initials, addSq}
    axios.post('/user/addSquare', user).then(res=>{
      alert(res.data);
    });
    }
   
  }

  changeTeamNum = (e, team, index)=>{
    console.log(e.target.value, team);
    axios.post('http://localhost:5000/game/changeTeamNum', {num: e.target.value, team, index}).then(res=>{
      alert(res.data);
    });
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

        </div>

         <div>Patriots Side</div>
        {
          this.state.patsNum.map((num, index)=>{
            return(

              <select 
                onChange={(e)=>{this.changeTeamNum(e, 'patsNum', index)}}
                style={styles.select}
                >
                
                <option value={num}>{num}</option>
                {num !== null || num !== '' ? <option value=""></option> : null}
                {this.state.patsNum.map((num, index)=>{
                  return(
                    <option value={index}>{index}</option>
                  )
                })}
            </select>

              // <input style={styles.inputs} name="num" placeholder={`${num}`} value={this.state.num} onChange={(e)=>{this.handleChangeNum(e, 'patsNum', num)}}/>
            )
          })
        }
        <div>Rams Side</div>
        {
          this.state.ramsNum.map((num, index)=>{
            return(

              <select 
                onChange={(e)=>{this.changeTeamNum(e, 'ramsNum', index)}}
                style={styles.select}
                >
                
                <option value={num}>{num}</option>
                {num !== null || num !== '' ? <option value=""></option> : null}
                {this.state.ramsNum.map((num, index)=>{
                  return(
                    <option value={index}>{index}</option>
                  )
                })}
            </select>

              // <input style={styles.inputs} name="num" placeholder={`${num}`} value={this.state.num} onChange={(e)=>{this.handleChangeNum(e, 'patsNum', num)}}/>
            )
          })
        }
        
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
  select: {
    fontSize: 22
  },
  button: {
    fontSize: 20,
    padding: '5px 10px'
  }
}

export default Admin;





   