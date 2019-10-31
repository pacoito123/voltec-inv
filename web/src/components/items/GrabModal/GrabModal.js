import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateItem } from '../../../actions/itemActions';

const GrabModal = ({ current, updateItem }) => {
	useEffect(() => {
		if (current !== null) setItem(current);
		// eslint-disable-next-line
	}, [current]);

	const [item, setItem] = useState({
		id: -1,
		name: '',
		tags: [],
		amount: 1,
		image: '',
		storedIn: '',
		grabbedBy: [],
		amountGrabbed: 0,
		timesGrabbed: 0
	});

	const [grabName, setGrabName] = useState('');
	const [grabAmount, setGrabAmount] = useState(1);

	const {
		id,
		name,
		tags,
		amount,
		image,
		storedIn,
		grabbedBy,
		amountGrabbed,
		timesGrabbed
	} = item;

	const onSubmit = e => {
		e.preventDefault();

		const newItem = {
			id,
			name,
			tags,
			amount,
			image,
			storedIn,
			grabbedBy: [
				...grabbedBy,
				{
					user: grabName,
					amount: grabAmount,
					date: new Date()
				}
			],
			amountGrabbed: amountGrabbed + grabAmount,
			timesGrabbed: timesGrabbed + 1
		};

		console.log(newItem);
		updateItem(newItem);
		clearFields();
	};

	const clearFields = () => {
		setItem({
			id: -1,
			name: '',
			tags: [],
			amount: 1,
			image: '',
			storedIn: '',
			grabbedBy: [],
			amountGrabbed: 0,
			timesGrabbed: 0
		});
		setGrabName('');
		setGrabAmount(1);
	};

	return (
		item !== null && (
			<div
				id='grab-item'
				className='modal'
				style={{ maxHeight: '100%', overflow: 'hidden' }}
			>
				<div className='container'>
					<div className='modal-content'>
						<h4>Agarrar {name}</h4>
						<br />
						<div className='row'>
							<div className='col s8'>
								<div className='input-field'>
									<input
										type='text'
										name='name'
										value={grabName}
										onChange={e =>
											setGrabName(e.target.value)
										}
										required
									/>
									<label htmlFor='name' className='active'>
										¿Quién lo va a agarrar?
									</label>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col s8'>
								<div className='input-field'>
									<label htmlFor='amount'>
										Cantidad por agarrar
									</label>
									<input
										type='number'
										name='amount'
										value={grabAmount}
										onChange={e =>
											e.target.value <= amount &&
											e.target.value > 0 &&
											setGrabAmount(e.target.value)
										}
										required
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='modal-footer'>
					<a
						href='#!'
						onClick={onSubmit}
						className='modal-close waves-effect blue waves-light btn'
					>
						Agarrar
					</a>
				</div>
			</div>
		)
	);
};

GrabModal.propTypes = {
	current: PropTypes.object,
	updateItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	current: state.item.current
});

export default connect(
	mapStateToProps,
	{ updateItem }
)(GrabModal);
