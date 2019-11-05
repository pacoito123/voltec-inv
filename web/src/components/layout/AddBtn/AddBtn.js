import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { clearCurrent } from '../../../actions/itemActions';

const AddBtn = ({ isAuthenticated, user, clearCurrent }) => {
	if (
		isAuthenticated === null ||
		!isAuthenticated ||
		(user === null || !user.admin)
	)
		return null;

	const clearAll = () => {
		clearCurrent();
	};

	return (
		<div className='fixed-action-btn'>
			<a
				className='btn-floating btn-large red modal-trigger'
				href='#item-modal'
				onClick={clearAll}
			>
				<i className='large material-icons'>add</i>
			</a>
			<ul>
				<li>
					<a
						href='#tag-modal'
						className='btn-floating green modal-trigger'
					>
						<i className='material-icons'>label</i>
					</a>
				</li>
			</ul>
		</div>
	);
};

AddBtn.propTypes = {
	clearCurrent: PropTypes.func.isRequired,
	user: PropTypes.object,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(
	mapStateToProps,
	{ clearCurrent }
)(AddBtn);
