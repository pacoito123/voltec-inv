import PropTypes from 'prop-types';
import React from 'react';

const Ticker = ({ amount, onAmountChange, onBtnClick }) => {
	return (
		<div className='row'>
			<div className='input-field col s6 m8'>
				<i className='material-icons prefix'>
					{amount > 0
						? amount <= 9
							? `filter_${amount}`
							: 'filter_9_plus'
						: 'filter'}
				</i>
				<label htmlFor='amount'>Cantidad</label>
				<input
					type='number'
					id='amount'
					name='amount'
					value={amount}
					onChange={onAmountChange}
				/>
			</div>
			<div className='col s3 m2'>
				<a
					href='#!'
					onClick={() => onBtnClick(1)}
					className='waves-effect waves-light btn cyan darken-1'
				>
					<i className='material-icons'>add</i>
				</a>
			</div>
			<div className='col s3 m2'>
				<a
					href='#!'
					onClick={() => onBtnClick(-1)}
					className='waves-effect waves-light btn cyan darken-1'
				>
					<i className='material-icons'>remove</i>
				</a>
			</div>
		</div>
	);
};

Ticker.propTypes = {
	amount: PropTypes.number.isRequired,
	onAmountChange: PropTypes.func,
	onBtnClick: PropTypes.func
};

export default Ticker;
