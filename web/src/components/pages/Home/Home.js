import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../../actions/authActions';
import { getItems } from '../../../actions/itemActions';
import VoltecLogo from '../../../assets/Logo.png';
import ItemList from '../../items/ItemList/ItemList';
import Logo from '../../layout/Logo/Logo';
import SearchBar from '../../layout/SearchBar/SearchBar';

const Home = ({ loadUser, getItems }) => {
	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	return (
		<Fragment>
			<Logo
				width='30%'
				link='http://www.voltec6647.com/'
				image={VoltecLogo}
				refreshAction={() => {
					loadUser();
					getItems();
				}}
			/>
			<div className='row'>
				<div className='col s12'>
					<SearchBar />
					<br />
					<ItemList />
				</div>
			</div>
		</Fragment>
	);
};

Home.propTypes = {
	loadUser: PropTypes.func.isRequired,
	getItems: PropTypes.func.isRequired
};

export default connect(null, { loadUser, getItems })(Home);
