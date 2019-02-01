import React, { Component } from 'react';
import axios from 'axios';
import IconTabs from './Tabs';

const user = null;
class Payouts extends Component {
  state = {
    users: [],
    game: {}
  }

   componentDidMount(){
    axios.get('/user').then(res=>{
      this.setState({
        users: res.data
      })
    });
    axios.get('/game').then(res=>{
      console.log('game', res.data);
      this.setState({
        game: res.data
      })
    });
  }

  // handleOnChange = (event)=>{
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // }

  // handleUpdateScore = ()=>{
  //   const {time, patsScore, ramsScore} = this.state;
  //   if(time !== '' && patsScore !== '' && ramsScore !== ''){
  //      const scores = [patsScore, ramsScore];

  //   axios.post('/game/updateScores', {score: scores, time: this.state.time}).then(res=>{
  //     console.log('updated', res.data);
  //   });
  //   }
   
  // }

  //   handleAddSq = ()=>{
  //   const {addSq, initials} = this.state;
  //   if(addSq !== ''){
  //     const user = {initials, addSq}
  //   axios.post('/user/addSquare', user).then(res=>{
  //     alert(res.data);
  //   });
  //   }
   
  // }l



  render() {
    console.log('all users', this.state.users);
    const me = JSON.parse(localStorage.getItem('user'));
    let totalAvailableSq = 0;
    this.state.users.forEach(user=>{
      totalAvailableSq = totalAvailableSq + user.availablePicks;
    });
    if(!me){
      this.props.history.push('/signup');
    }
    return (
      <div style={styles.root}>
      {/* <div style={{fontSize: 16}}>Rules</div> */}
      <div style={{textAlign: 'left'}}>
      <div style={styles.rules}>
      {/* <div style={styles.rule}>$10 per square.</div>
      <div style={styles.rule}>Must purchase square first to begin playing.</div>
      <div style={styles.rule}>To pay for your square, you can venmo Kao Muang at '@Kao-M-Saephan' or Sing at '@Singta-Lee' or give cash to them.</div> */}
      <div style={styles.rule}>There will be 8 payouts through out the Superbowl, 4 payouts for exact score and 4 payouts for reverse score.</div>
      {/* <div style={styles.rule}>You can change your picks anytime as long as there is still an empty square. Once all squares are filled up, the board will be locked.</div>
      <div style={styles.rule}>We will have a team number drawing one hour before the Superbowl. Location TBD.</div> */}
      </div>
      </div>
      
        {/* PAYOUTS */}
        <div className="flex center">
          <div className="winning square"></div><div style={styles.title}>PAYOUTS</div></div>
        <div style={styles.payouts}>
          <table>
            <tr>
              <th>Quarter</th>
              <th>Payout</th> 
              <th>Winner</th>
            </tr>
            <tr>
              <td>First</td>
              <td>$150</td> 
              <td>{this.state.game.q1Winner}</td>
            </tr>
            <tr>
              <td>Second</td>
              <td>$200</td> 
              <td>{this.state.game.q2Winner}</td>
            </tr>
            <tr>
              <td>Third</td>
              <td>$150</td> 
              <td>{this.state.game.q3Winner}</td>
            </tr>
            <tr>
              <td>Final score</td>
              <td>$300</td> 
              <td>{this.state.game.q4Winner}</td>
            </tr>
          </table>
        </div>
        <br/>
        {/* END PAYOUTS */}
        {/* OPPOSITE PAYOUTS */}
        <div className="flex center"><div className="winning round"></div><div style={styles.title}>PAYOUTS REVERSE</div></div>
        <div style={styles.payouts}>
          <table>
            <tr>
              <th>Quarter</th>
              <th>Payout</th> 
              <th>Winner</th>
            </tr>
            <tr>
              <td>First</td>
              <td>$50</td> 
              <td>{this.state.game.q1WinnerRv}</td>
            </tr>
            <tr>
              <td>Second</td>
              <td>$50</td> 
              <td>{this.state.game.q2WinnerRv}</td>
            </tr>
            <tr>
              <td>Third</td>
              <td>$50</td> 
              <td>{this.state.game.q3WinnerRv}</td>
            </tr>
            <tr>
              <td>Final score</td>
              <td>$50</td> 
              <td>{this.state.game.q4WinnerRv}</td>
            </tr>
          </table>
        </div>
        {/* END OPOSITI PAYOUT */}
        <br/>
        <div className="flex center"><div><img style={{width: 20, paddingRight: 3}} src={'/smiley.png'}/></div><div style={{fontSize: 14}}>PLAYERS</div></div>
        <div style={styles.payouts}>
          <table>
            <tr>
              <th>Name</th>
              <th>Initials</th> 
              <th>Square</th>
              <th>Paid</th>
              {me.admin ? <th>PWD</th> : null}
            </tr>
            {this.state.users.map(user=>{
              return(
                <tr>
                  <td>{user.name}</td>
                  <td>{user.initials}</td> 
                  <td>{user.availablePicks}</td>
                  <td>${user.availablePicks * 10}</td>
                  {me.admin ? <td>{user.password}</td> : null}

                </tr>
              )
            })}
            
          </table>
          <div>Total squares bought: {totalAvailableSq}</div>
        </div>
        {/* space for scrolling to the way down */}
        <div style={{height: 70}}></div>
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
  },
  rules: {
    fontSize: 13,
    padding: '3px 10px'
  },
  rule: {
    borderBottom: '1px solid #bbbbbb',
    marginBottom: 5
  },
  payouts: {
    fontSize: 14
  },
  title: {
    fontSize: 14
  }
}

export default Payouts;
