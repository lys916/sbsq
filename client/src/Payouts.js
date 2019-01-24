import React, { Component } from 'react';
import axios from 'axios';
import IconTabs from './Tabs';

const user = null;
class Payouts extends Component {
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

    axios.post('/game/updateScores', {score: scores, time: this.state.time}).then(res=>{
      console.log('updated', res.data);
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
      <br/>
        {/* PAYOUTS */}
        <div className="flex center"><div className="winning square"></div><div style={{marginBottom: 7}}>PAYOUTS</div></div>
        <div style={styles.payouts}>
          <table>
            <tr>
              <th>Quarters</th>
              <th>Payouts</th> 
              <th>Winners</th>
            </tr>
            <tr>
              <td>First</td>
              <td>$150</td> 
              <td>?</td>
            </tr>
            <tr>
              <td>Second</td>
              <td>$200</td> 
              <td>?</td>
            </tr>
            <tr>
              <td>Third</td>
              <td>$150</td> 
              <td>?</td>
            </tr>
            <tr>
              <td>Fourth</td>
              <td>$300</td> 
              <td>?</td>
            </tr>
          </table>
        </div>
        <br/>
        {/* END PAYOUTS */}
        {/* OPOSITE PAYOUTS */}
        <div className="flex center"><div className="winning round"></div><div style={{marginBottom: 7}}>PAYOUTS OPOSITE</div></div>
        <div style={styles.payouts}>
          <table>
            <tr>
              <th>Quarters</th>
              <th>Payouts</th> 
              <th>Winners</th>
            </tr>
            <tr>
              <td>First</td>
              <td>$50</td> 
              <td>?</td>
            </tr>
            <tr>
              <td>Second</td>
              <td>$50</td> 
              <td>?</td>
            </tr>
            <tr>
              <td>Third</td>
              <td>$50</td> 
              <td>?</td>
            </tr>
            <tr>
              <td>Fourth</td>
              <td>$50</td> 
              <td>?</td>
            </tr>
          </table>
        </div>
        {/* END OPOSITI PAYOUT */}
        <br/>
        <div className="flex center"><div><img style={{width: 24, paddingRight: 10}} src={'/smiley.png'}/></div><div>PLAYERS</div></div>
        <div style={styles.payouts}>
          <table>
            <tr>
              <th>Name</th>
              <th>Initials</th> 
              <th>Squares</th>
              <th>Won</th>
            </tr>
            <tr>
              <td>Lo Saephan</td>
              <td>LYS</td> 
              <td>7</td>
              <td>$0</td>
            </tr>
          </table>
        </div>
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

export default Payouts;
