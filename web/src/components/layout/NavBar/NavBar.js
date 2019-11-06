import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../actions/authActions';

const NavBar = ({ isAuthenticated, user, logout }) => {
	return (
		<div className='fixed-navbar'>
			<nav>
				<div className='nav-wrapper blue darken-1'>
					<a href='/' className='brand-logo center'>
						voltec-inv
					</a>
					<ul className='right'>
						{isAuthenticated && user !== null ? (
							<Fragment>
								<li>
									<a href='/user'>{user.name}</a>
								</li>
								<li>
									<a href='#!' onClick={() => logout()}>
										<i className='material-icons'>
											exit_to_app
										</i>
									</a>
								</li>
							</Fragment>
						) : (
							<li>
								<a href='/user'>
									<i className='material-icons'>
										account_circle
									</i>
								</a>
							</li>
						)}
					</ul>
				</div>
			</nav>
		</div>
	);
};

NavBar.propTypes = {
	isAuthenticated: PropTypes.bool,
	user: PropTypes.object,
	logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user
});

export default connect(
	mapStateToProps,
	{ logout }
)(NavBar);
