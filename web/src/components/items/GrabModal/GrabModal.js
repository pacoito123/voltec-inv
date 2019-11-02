import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateItem } from '../../../actions/itemActions';
import Ticker from '../../layout/Ticker/Ticker';

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

		if (grabName !== '') {
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
		} else {
			M.toast({ html: 'Por favor introduzca un nombre.' });
		}
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

	const updateAmount = amountAdded => {
		setGrabAmount(
			grabAmount + amountAdded <= amount - amountGrabbed &&
				grabAmount + amountAdded > 0
				? grabAmount + amountAdded
				: grabAmount
		);
	};

	return (
		item !== null && (
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
									onChange={e => setGrabName(e.target.value)}
									required
								/>
								<label htmlFor='grab' className='active'>
									¿Quién lo va a agarrar?
								</label>
							</div>
						</div>
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
