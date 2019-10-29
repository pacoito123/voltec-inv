import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const StoredInModal = ({ current }) => (
	<div id='stored-in' className='modal'>
		{current && (
			<div className='modal-content center'>
				<h4>{current.name}</h4>
				<br />
				<img src={current.storedIn} alt='' className='' width='500px' />
			</div>
		)}
	</div>
);

StoredInModal.propTypes = {
	current: PropTypes.object
};

const mapStateToProps = state => ({
	current: state.item.current
});

export default connect(mapStateToProps)(StoredInModal);
