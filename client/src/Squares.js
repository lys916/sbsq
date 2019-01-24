import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import IconTabs from './Tabs';
import ScoreBoard from './ScoreBoard';

const sq = [...Array(10).keys()];

const user = null;

const styles = {
  root: {
		display: 'flex', 
		justifyContent: 'center', 
		marginTop: 10,
	},
	board: {
		display: 'flex', 
		justifyContent: 'center',
		borderRight: '3px solid #0f2D72',
		borderBottom: '3px solid #002244',
	},
  // rightSection: {
  //   border: '1px solid blue', 
  //   width: '100%'
  // },
  topName: {
		height: '7.5vw', 
		background: '#0f2D72', 
		color: '#ffcd00', 
		letterSpacing: 6,
		textAlign: 'center',
		lineHeight: '7.5vw'
	},
  leftName: {background: 'gray', background: '#002244', color: 'white'},
  ramsNumWrap: {
		display: 'flex', 
		background: '#dedede',
		// justifyContent:'center',
    // alignContent:'center',
    // flexDirection:'row', /* column | row */
	},
  patsNumWrap: {background: '#dedede', borderRight: '1px solid #bbbbbb'},

  ramsNum: {
		width: '7.5vw', 
		lineHeight: '7.5vw', 
		background: '#dedede', 
		borderRight: '1px solid #bbbbbb',
	},
  patsNum: {
		display: 'flex', 
		height: '7.5vw', 
		background: '#dedede', 
		borderBottom: '1px solid #bbbbbb',
		lineHeight: '7.5vw'
	},

  row: {display: 'flex', height: '7.5vw', borderBottom: '1px solid #bbbbbb'
	},

  squares: {},
  blankOut: {width: '7.5vw', height: '7.5vw', background: '#0a2456'},
  blankIn: {
		width: '7.5vw', 
		height: '7.5vw', 
		background: '#bbbbbb', 
		position: 'relative'
		// borderBottom: '1px solid #bbbbbb', 
		// borderRight: '1px solid #bbbbbb'
	},
	cell: {
		textAlign: 'center',
		width: '7.5vw'
	},
	username: {
		background: '#555555',
		fontSize: 14,
		textAlign: 'left',
		padding: '5px 7px',
		color: '#dedede',
		display: 'flex',
		justifyContent: 'space-between',
	},
	arrows: {
		width: '100%'
	},
	update: {
		width: 19,
		marginBottom: -4
	}
} 

class Squares extends Component {
  state = {
    squares: null, 
    ramsNum: [],
    patsNum: [],
    teams: [],
    toInsert: null,
		score: ['', ''],
		time: '',
		user: JSON.parse(localStorage.getItem('user'))
  }

  componentDidMount(){
   
    axios.get('/game').then(res=>{
     
      const {squares, ramsNum, patsNum, teams, time, score} = res.data;
      this.setState({
        squares, 
        ramsNum,
        patsNum,
        teams,
				score,
				time
      })
    });
  }

  handleSignout = ()=>{
    localStorage.removeItem('user');
    this.props.history.push('/login');
  }

	refreshUser = ()=>{
		console.log('user id', this.state.user._id);
		axios.post('/user', {id: this.state.user._id}).then(res=>{
			localStorage.setItem('user', JSON.stringify(res.data));
			this.setState({user: res.data});
		});
	}

  pickSq = (sq, user)=>{
		// get number of picked squares by this user
		console.log(this.state.squares[sq].name, user.initials);

		//if user remvoe square
		const sqName = this.state.squares[sq].name;
		if(sqName === user.initials){
			// remove name
				axios.post('/game/pickSq', {sq, user}).then(res=>{
		
				this.setState({squares: res.data.squares});
	
      
    	});
		}

		else if(sqName === null || sqName === ''){

			// calculate available square
			let picksMade = 0;
			if(this.state.squares){
				for (const key in this.state.squares) {
					let name = this.state.squares[key].name;
				
					if (user.initials === name) {
						picksMade++;    
					}
				}
			}

			// if user still have available square
			if(picksMade < user.availablePicks){
				axios.post('/game/pickSq', {sq, user}).then(res=>{
		
					if(res.data === 'taken'){
						alert('square is taken');
					}else{
						this.setState({squares: res.data.squares});
					}
				
    		});
			// user dont' have anymore square
			}else{
				alert("You don't have any available square, go buy some!");
			}

				
			}
		else{
			alert("This square is taken.");
		}

		

		
  }

  // changeTeamNum = (e, team, index)=>{
  //   console.log(e.target.value, team);
  //   axios.post('http://localhost:5000/game/changeTeamNum', {num: e.target.value, team, index}).then(res=>{
  //     this.setState({[team]: res.data});
  //   });
  // }
  render() {
    const user = this.state.user;
		if(!user){
      this.props.history.push('/signup');
			return null;
    }
		let picksMade = 0;
		if(this.state.squares){
			for (const key in this.state.squares) {
				let name = this.state.squares[key].name;
			
				if (user.initials === name) {
					picksMade++;    
				}
			}
		}
		
    return (
			<div>
			<div style={styles.username}>

				<div>Hello, {user.name} <span><img style={styles.update} src={'/signout.png'} onClick={this.handleSignout}/></span></div>

				<div style={styles.availablePicks}>Your squares: {picksMade} / {user.availablePicks} <span><img style={styles.update} src={'/update.png'} onClick={this.refreshUser}/></span></div>
			</div>
			<ScoreBoard score={this.state.score} time={this.state.time}/>
			
      <div style={styles.root}>
				
        <div style={styles.leftName}>
          <div style={styles.blankOut}></div>
          <div style={{paddingTop: '17vw', textAlign: 'center'}}>P</div>
          <div style={{textAlign: 'center'}}>A</div>
          <div style={{textAlign: 'center'}}>T</div>
					<div style={{textAlign: 'center'}}>R</div>
          <div style={{textAlign: 'center'}}>I</div>
					<div style={{textAlign: 'center'}}>O</div>
          <div style={{textAlign: 'center'}}>T</div>
          <div style={{textAlign: 'center'}}>S</div>
        </div>
        <div style={styles.rightSection}>
          <div style={styles.topName}>RAM</div>
          {/* board */}
          <div style={styles.board}>
            <div style={styles.patsNumWrap}>
              <div style={styles.blankIn}><img style={styles.arrows} src={'/arrows.png'} /></div>
							{/* PATRIOTS */}
              {this.state.patsNum.map((num, index)=>{
                return(
                  <div style={styles.patsNum}>
									<div style={styles.cell}>{num === null || num === '' ? '?' : num}</div>
										{/* if user is admin then show num with dropdown */}
										{/* {user.admin ?

											<select 
												onChange={(e)=>{this.changeTeamNum(e, 'patsNum', index)}}>
											
												<option value={num}>{num}</option>
												{num !== null || num !== '' ? <option value=""></option> : null}
												{this.state.patsNum.map((num, index)=>{
													return(
													
														<option value={index}>{index}</option>
													)
												})}
										</select> : <div style={styles.cell}>{num === null || num === '' ? '?' : num}</div> } */}
                  </div>
                )
              })}
            </div>
            <div style={styles.rightSection}>
              <div style={styles.ramsNumWrap}>
							{/* RAMS */}
                {this.state.ramsNum.map((num, index)=>{
                return(
                  <div style={styles.ramsNum} onClick={()=>{}}>
									<div style={styles.cell}>{num === null || num === '' ? '?' : num}</div>
                    {/* {user.admin ?

											<select 
												onChange={(e)=>{this.changeTeamNum(e, 'ramsNum', index)}}>
											
												<option value={num}>{num}</option>
												{num !== null || num !== '' ? <option value=""></option> : null}
												{this.state.ramsNum.map((num, index)=>{
													return(
														
														<option value={index}>{index}</option>
													)
												})}
										</select> : <div style={styles.cell}>{num === null || num === '' ? '?' : num}</div> } */}
                  </div>
                )
              })}
              </div>
              {/* squares */}
              <div style={styles.squares}>
                {sq.map(row=>{
                  
                  return (
										// each row
                    <div style={styles.row}>
                      {sq.map(col=>{
												// get cell number
                        const num = row.toString()+col.toString();
												// current game score
												const ramsNum = this.state.ramsNum[col];
												const patsNum = this.state.patsNum[row];

												//Patriots num and score calculations ******
												const patsScore = this.state.score[0];
												const patsScoreLen = patsScore.length;
												const patsScoreLastDigit = patsScore[patsScoreLen - 1];
												const patsTdString = (Number(patsScore)+7).toString();
												const patsFgString = (Number(patsScore)+3).toString();
												const patsSafetyString = (Number(patsScore)+2).toString();
												const patsNoXpString = (Number(patsScore)+6).toString();
												const patsTdLastDigit = patsTdString[patsTdString.length- 1];
												const patsFgLastDigit = patsFgString[patsFgString.length- 1];
												const patsSafetyLastDigit = patsSafetyString[patsSafetyString.length- 1];
												const patsNoXpLastDigit = patsNoXpString[patsNoXpString.length- 1];

												//Rams num and score calculations ********
												const ramsScore = this.state.score[1];
												const ramScoreLen = ramsScore.length;
												const ramsScoreLastDigit = ramsScore[ramScoreLen - 1];
												const ramsTdString = (Number(ramsScore)+7).toString();
												const ramsFgString = (Number(ramsScore)+3).toString();
												const ramsSafetyString = (Number(ramsScore)+2).toString();
												const ramsNoXpString = (Number(ramsScore)+6).toString();
												const ramsTdLastDigit = ramsTdString[ramsTdString.length- 1];
												const ramsFgLastDigit = ramsFgString[ramsFgString.length- 1];
												const ramsSafetyLastDigit = ramsSafetyString[ramsSafetyString.length- 1];
												const ramsNoXpLastDigit = ramsNoXpString[ramsNoXpString.length- 1];

												//get winning cell
												const winning = ramsNum === ramsScoreLastDigit && patsNum === patsScoreLastDigit && this.state.squares;

												const winningOp = ramsNum === patsScoreLastDigit && patsNum === ramsScoreLastDigit && this.state.squares;

												//rams next score
												const ramsNeedTdOp = ramsNum === patsScoreLastDigit && patsNum === ramsTdLastDigit && this.state.squares;

												 const ramsNeedTd = ramsNum === ramsTdLastDigit && patsNum === patsScoreLastDigit && this.state.squares;

												 //

												const ramsNeedFg = ramsNum === ramsFgLastDigit && patsNum === patsScoreLastDigit && this.state.squares;

												const ramsNeedFgOp = ramsNum === patsScoreLastDigit && patsNum === ramsFgLastDigit && this.state.squares;
												//

												const ramsNeedSafety = ramsNum === ramsSafetyLastDigit && patsNum === patsScoreLastDigit && this.state.squares;

												const ramsNeedSafetyOp = ramsNum === patsScoreLastDigit && patsNum === ramsSafetyLastDigit && this.state.squares;
												//

												const ramsXpNoGood = ramsNum === ramsNoXpLastDigit && patsNum === patsScoreLastDigit && this.state.squares;

												const ramsXpNoGoodOp = ramsNum === patsScoreLastDigit && patsNum === ramsNoXpLastDigit && this.state.squares;
												//

												//pats next score
												const patsNeedTd = patsNum === patsTdLastDigit && ramsNum === ramsScoreLastDigit && this.state.squares;

												const patsNeedTdOp = patsNum === ramsScoreLastDigit && ramsNum === patsTdLastDigit && this.state.squares;
												//

												const patsNeedFg = patsNum === patsFgLastDigit && ramsNum === ramsScoreLastDigit && this.state.squares;

												const patsNeedFgOp = patsNum === ramsScoreLastDigit && ramsNum === patsFgLastDigit && this.state.squares;
												//

												const patsNeedSafety = patsNum === patsSafetyLastDigit && ramsNum === ramsScoreLastDigit && this.state.squares;

												const patsNeedSafetyOp = patsNum === ramsScoreLastDigit && ramsNum === patsSafetyLastDigit && this.state.squares
												//

												const patsXpNoGood = patsNum === patsNoXpLastDigit && ramsNum === ramsScoreLastDigit && this.state.squares;

												const patsXpNoGoodOp = patsNum === ramsScoreLastDigit && ramsNum === patsNoXpLastDigit && this.state.squares;
												//


												// const name = this.state.squares ? this.state.squares[num].name : null;
												
										
                        return(
                          // each cell
                          <div className={`col 
													  
														${winning ? 'winning' : null} 
														 
														${ramsNeedTd ? 'ramsScoreTd' : null}
														 
														${ramsNeedFg ? 'ramsScoreFg' : null} 
														 
														${ramsXpNoGood ? 'ramsXpNoGood' : null} 
														
														${ramsNeedSafety ? 'ramsScoreSafety' : null}
													
														${patsNeedTd ? 'patsScoreTd' : null} 
													
														${patsNeedFg ? 'patsScoreFg' : null} 
														${patsXpNoGood ? 'patsXpNoGood' : null} 
														
														${patsNeedSafety ? 'patsScoreSafety' : null}
														
														`}
														onClick={()=>{this.pickSq(num, user)}}>
														<div className={`

															${ramsNeedSafetyOp ? 'ramsScoreSafetyOp' : null}
															${patsXpNoGoodOp ? 'patsXpNoGoodOp' : null} 
														${patsNeedSafetyOp ? 'patsScoreSafetyOp' : null}
															${patsNeedTdOp ? 'patsScoreTdOp' : null} 
														${patsNeedFgOp ? 'patsScoreFgOp' : null} 
															${ramsNeedTdOp ? 'ramsScoreTdOp' : null}
															${ramsNeedFgOp ? 'ramsScoreFgOp' : null}
															${ramsXpNoGoodOp ? 'ramsXpNoGoodOp' : null}
															${winningOp ? 'winningOp' : null}`}>
															{this.state.squares ? this.state.squares[num].name : null}
														</div>
                          	{/* {this.state.squares ? this.state.squares[num].name : null} */}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
			{/* COLOR CODES */}
			<div className="flex around colorCodes">

				<div className="patsSection">

					<div style={{display: 'flex', paddingTop: '5px'}}>
					<div className="winning colorBox"></div>
					<div className="codeText">
						Currently winning
					</div>
				</div>
				

					<div className="flex">
						<div className="patsScoreTd colorBox">
							<div className="roundBox"></div>
						</div>
						<div className="codeText">
							If Patriots score a TD
						</div>
					</div>

					<div className="flex">
						<div className="patsScoreFg colorBox">
						<div className="roundBox"></div>
						</div>
						<div className="codeText">
							If Patriots score a FG
						</div>
					</div>

					<div className="flex">
						<div className="patsScoreSafety colorBox">
						<div className="roundBox"></div>
						</div>
						<div className="codeText">
							If Patriots score a Safety
						</div>
					</div>
					<div className="flex">
						<div className="patsXpNoGood colorBox">
						<div className="roundBox"></div>
						</div>
						<div className="codeText">
							Patriots TD / PAT no good
						</div>
					</div>
				</div>

				<div className="ramSection">

					<div style={{display: 'flex', paddingTop: 5}}>
						<div className="winningOp colorBox"></div>
						<div className="codeText">
							Currently winning oposite
						</div>
					</div>

					<div className="flex">
						<div className="ramsScoreTd colorBox">
						<div className="roundBox"></div>
						</div>
						<div className="codeText">
							If Rams score a TD
						</div>
					</div>

					<div className="flex">
						<div className="ramsScoreFg colorBox">
						<div className="roundBox"></div>
						</div>
						<div className="codeText">
							If Rams score a FG
						</div>
					</div>

					<div className="flex">
						<div className="ramsScoreSafety colorBox">
						<div className="roundBox"></div>
						</div>
						<div className="codeText">
							If Rams score a Safety
						</div>
					</div>

					<div className="flex">
						<div className="ramsXpNoGood colorBox">
						<div className="roundBox"></div>
						</div>
						<div className="codeText">
							Ram TD / PAT no good
						</div>
					</div>

				</div>
			</div>
			<div style={{height: 50}}></div>
			</div>
    );
  }
}

export default Squares;
