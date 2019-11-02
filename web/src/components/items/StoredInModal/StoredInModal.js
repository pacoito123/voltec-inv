import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const StoredInModal = ({ current }) => (
	<div id='stored-in' className='modal light-blue lighten-4'>
		{current && (
			<Fragment>
				<div
					className='modal-header cyan darken-1 center'
					style={{ padding: '20px 0px 10px 0px' }}
				>
					<h4>{current.name}</h4>
				</div>
				<div className='modal-content center'>
					<img src={current.storedIn} alt='' className='' width='500px'/>
				</div>
			</Fragment>
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
