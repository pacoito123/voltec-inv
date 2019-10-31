import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { setCurrent } from '../../../../actions/itemActions';

const GrabBtn = ({ item, setCurrent }) => {
	const { amount, amountGrabbed } = item;
	return (
		<Fragment>
			{amount - amountGrabbed > 0 ? (
				<a
					href='#grab-item'
					className='waves-effect waves-light btn-small white-text light-green darken-3 hoverable modal-trigger'
					onClick={() => setCurrent(item)}
				>
					<i className='material-icons left'>pan_tool</i>
					Agarrar
				</a>
			) : (
				<a href='#!' className='btn-small white-text' disabled>
					<i className='material-icons left'>pan_tool</i>
					Agarrar
				</a>
			)}
			<span
				className='new badge white black-text'
				data-badge-caption={`${amount - amountGrabbed}/${amount}`}
			/>
		</Fragment>
	);
};

GrabBtn.propTypes = {
	item: PropTypes.object.isRequired,
	setCurrent: PropTypes.func.isRequired
};

export default connect(
	null,
	{ setCurrent }
)(GrabBtn);
