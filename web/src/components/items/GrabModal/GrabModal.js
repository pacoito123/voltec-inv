import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateItem } from '../../../actions/itemActions';
import Ticker from '../../layout/Ticker/Ticker';

const GrabModal = ({ current, user, updateItem }) => {
	useEffect(() => {
		if (current !== null) setItem(current);
		// eslint-disable-next-line
	}, [current]);

	const [item, setItem] = useState({});

	const [grabName, setGrabName] = useState('');
	const [grabAmount, setGrabAmount] = useState(1);

	const { name, amount, grabbedBy, amountGrabbed, timesGrabbed } = item;

	const onSubmit = e => {
		e.preventDefault();

		let newItem = {
			...item,
			grabbedBy: [
				...grabbedBy,
				{
					user: user._id,
					name: grabName === '' ? user.name : grabName,
					amount: grabAmount,
					date: new Date()
				}
			],
			amountGrabbed: amountGrabbed + grabAmount,
			timesGrabbed: timesGrabbed + 1
		};

		updateItem(newItem, true);
		clearFields();
	};

	const updateAmount = amountAdded => {
		setGrabAmount(
			grabAmount + amountAdded <= amount - amountGrabbed &&
				grabAmount + amountAdded > 0
				? grabAmount + amountAdded
				: grabAmount
		);
	};

	const clearFields = () => {
		setItem({});
		setGrabName('');
		setGrabAmount(1);
	};

	return (
		<div
			id='grab-item'
			className='modal light-blue lighten-4'
			style={{ maxHeight: '100%', overflow: 'hidden' }}
		>
			<div
				className='modal-header cyan darken-1 center'
				style={{ padding: '15px 0px 10px 0px' }}
			>
				<h4>Agarrar {name}</h4>
			</div>
			<div className='modal-content'>
				<div className='container'>
					{user !== null && user.admin && (
						<div className='row'>
							<div className='input-field'>
								<i className='material-icons prefix'>
									account_circle
								</i>
								<input
									type='text'
									id='grab'
									name='grab'
									value={grabName}
									placeholder={user.name}
									onChange={e => setGrabName(e.target.value)}
									required
								/>
								<label htmlFor='grab' className='active'>
									¿Quién lo va a agarrar?
								</label>
							</div>
						</div>
					)}
					<Ticker
						amount={grabAmount}
						onAmountChange={e =>
							e.target.value <= amount - amountGrabbed &&
							e.target.value > 0 &&
							setGrabAmount(Number(e.target.value))
						}
						onBtnClick={updateAmount}
					/>
				</div>
			</div>
			<div className='modal-footer cyan darken-1'>
				<a
					href='#!'
					onClick={onSubmit}
					className='modal-close waves-effect light-green darken-3 waves-light btn'
				>
					<i className='material-icons left'>pan_tool</i>
					Agarrar
				</a>
			</div>
		</div>
	);
};

GrabModal.propTypes = {
	current: PropTypes.object,
	user: PropTypes.object,
	updateItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	current: state.item.current,
	user: state.auth.user
});

export default connect(
	mapStateToProps,
	{ updateItem }
)(GrabModal);
