import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from '../../../assets/Logo.png';
import ItemList from '../../items/ItemList/ItemList';
import SearchBar from '../../layout/SearchBar/SearchBar';

const Home = ({ current }) => {
	return (
		<Fragment>
			<h1 className='center'>
				<a href='http://www.voltec6647.com/'>
					<img src={Logo} alt='' style={{ width: '25%' }} />
				</a>
			</h1>
			<div className='row'>
				<div className='col s12'>
					<SearchBar />
					<br />
					<ItemList />
				</div>
			</div>
			<div className='fixed-action-btn'>
				<a className='btn-floating btn-large red' href='#!'>
					<i className='large material-icons'>add</i>
				</a>
			</div>
			<div id='stored-in' className='modal'>
				<div className='modal-content center'>
					{current && (
						<Fragment>
							<h4>{current.name}</h4>
							<br />
							<img
								src={current.storedIn}
								alt=''
								className=''
								width='500px'
							/>
						</Fragment>
					)}
				</div>
			</div>
		</Fragment>
	);
};

Home.propTypes = {
	current: PropTypes.object
};

const mapStateToProps = state => ({
	current: state.item.current
});

export default connect(mapStateToProps)(Home);
