import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const GrabBtn = ({ item: { amount, amountGrabbed } }) => {
	return (
		<Fragment>
			{amount - amountGrabbed > 0 ? (
				<a
					href='#grab-item'
					className='waves-effect waves-light btn-small white-text light-green darken-3 hoverable modal-trigger'
				>
					Agarrar
				</a>
			) : (
				<a href='#!' className='btn-small white-text' disabled>
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
	item: PropTypes.object.isRequired
};

export default GrabBtn;
