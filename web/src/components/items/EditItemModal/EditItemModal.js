import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const EditItemModal = ({ current }) => {
	return <div id='edit-item' className='modal'>
		{current}
	</div>;
};

EditItemModal.propTypes = {
	current: PropTypes.object
};

const mapStateToProps = state => ({
	current: state.item.current
});

export default connect(mapStateToProps)(EditItemModal);
