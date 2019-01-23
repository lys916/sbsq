import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/FormatListBulleted';
import FavoriteIcon from '@material-ui/icons/People';
import PersonPinIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';

const tabs = {
	food: ['All', 'Chicken', 'Beef', 'Pork', 'Seafood', 'Salad', 'Appetizer', 'Others']
}

class IconTabs extends React.Component {
	state = {
		value: 0
	};

	componentDidMount(){
		const path = this.props.history.location.pathname;
		if(path === '/'){
			this.setState({value: 0}, ()=>{
                this.props.history.push('/squares');
            });
		}
		if(path === '/leaders'){
			this.setState({value: 1});
		}
		// if(path === '/drinks'){
		// 	this.setState({value: 2});
		// }
		// if(path === '/supplies'){
		// 	this.setState({value: 3});
		// }
	}

	handleChange = (event, value) => {
        console.log(value);
		const history = this.props.history;
		if (value === 0) {
			history.push('/squares');
		}
		if (value === 1) {
			history.push('/leaders');
		}
		this.setState({ value });
	};

	

	render() {
		const user = JSON.parse(localStorage.getItem('user'));
		console.log('tab render user', user);
        if(!user){
            return null;
        }
		return (
			<div style={styles.tabs}>
			<Paper square style={styles.root}>
				<Tabs
					value={this.state.value}
					onChange={this.handleChange}
					fullWidth
					indicatorColor="primary"
					textColor="primary"
				>
					<Tab label="Squares" />
					<Tab label="Leaders" />
				</Tabs>
			</Paper>
			
			</div>
		);
	}
}

// IconTabs.propTypes = {
// 	classes: PropTypes.object.isRequired,
// };

const styles = {
    root: {
		flexGrow: 1,
		marginTop: 56,
	},
	tabs: {
		width: '100%',
		fontSize: 13,
        position: 'fixed',
        bottom: 0
	}
};

export default withStyles(styles)(IconTabs);