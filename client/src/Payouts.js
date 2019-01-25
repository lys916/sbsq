import React, { Component } from 'react';
import axios from 'axios';
import IconTabs from './Tabs';

const user = null;
class Payouts extends Component {
  state = {
    users: []
  }

   componentDidMount(){
    axios.get('/user').then(res=>{
      this.setState({
        users: res.data
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
   
  // }



  render() {
    console.log('all users', this.state.users);
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
      this.props.history.push('/signup');
    }
    return (
      <div style={styles.root}>
      <div style={{fontSize: 20}}>Rules</div>
      <div style={{textAlign: 'left'}}>
      <div>$10 per square</div>
      <div>Must pay first before receiving your square</div>
      <div>To pay for your square, you can venmo Kao Muang at 'venmo' or Sing at 'venmo' or give cash to them.</div>
      <div>There will be 8 payouts through out the game (4 payouts for exact scores and 4 payouts for reverse scores for each quarter). See payouts below. </div>
      <div>You can change your picks anytime if there is still an empty square. Once it's filled up, the board will be locked.</div>
      <div>We will have a team number drawing 1 hour before superbowl starts. Location TBD.</div>
      </div>
      
        {/* PAYOUTS */}
        <div className="flex center"><div className="winning square"></div><div style={{marginBottom: 2}}>PAYOUTS</div></div>
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
        {/* OPPOSITE PAYOUTS */}
        <div className="flex center"><div className="winning round"></div><div style={{marginBottom: 2}}>PAYOUTS REVERSE</div></div>
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
        <div className="flex center"><div><img style={{width: 24, paddingRight: 3}} src={'/smiley.png'}/></div><div>PLAYERS</div></div>
        <div style={styles.payouts}>
          <table>
            <tr>
              <th>Name</th>
              <th>Initials</th> 
              <th>Square</th>
              <th>Paid</th>
            </tr>
            {this.state.users.map(user=>{
              return(
                <tr>
                  <td>{user.name}</td>
                  <td>{user.initials}</td> 
                  <td>{user.availablePicks}</td>
                  <td>${user.availablePicks * 10}</td>
                </tr>
              )
            })}
            
          </table>
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
  }
}

export default Payouts;
