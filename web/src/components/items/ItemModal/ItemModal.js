import Axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js';
import React, { Fragment, useState, useEffect } from 'react';
import { addItem, updateItem } from '../../../actions/itemActions';
import Spinner from '../../layout/Spinner/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TagSelectOptions from '../../tags/TagSelectOptions/TagSelectOptions';

const ItemModal = ({ current, addItem, updateItem }) => {
	useEffect(() => {
		if (current !== null) setItem(current);
		// eslint-disable-next-line
	}, [current]);

	const [item, setItem] = useState({
		name: '',
		tags: [],
		amount: 1,
		image: '',
		storedIn: '',
		grabbedBy: [],
		amountGrabbed: 0,
		timesGrabbed: 0
	});

	const { name, tags, amount, image, storedIn } = item;

	const [imgLoading, setImgLoading] = useState(false);
	const [storedInLoading, setStoredInLoading] = useState(false);

	const onChange = e => setItem({ ...item, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		
		if (current === null) addItem(item);
		else updateItem(item);

		clearFields();
	};

	const clearFields = () => {
		setItem({
			name: '',
			tags: [],
			amount: 1,
			image: '',
			storedIn: '',
			grabbedBy: [],
			amountGrabbed: 0,
			timesGrabbed: 0
		});
	};

	const uploadImage = async (img, storedInCheck) => {
		const config = {
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_IMGUR_ACCESS_TOKEN}`
			}
		};
		try {
			const res = await Axios.post(
				'https://api.imgur.com/3/upload/',
				img,
				config
			);

			if (!storedInCheck) {
				setItem({ ...item, image: res.data.data.link });
				setImgLoading(false);
			} else {
				setItem({ ...item, storedIn: res.data.data.link });
				setStoredInLoading(false);
			}

			M.toast({ html: 'Imágen subida!' });
		} catch (err) {
			console.error(err);
			M.toast({
				html: `Ha ocurrido un error. Por favor intente otra vez. ${err}`
			});
		}
	};

	return (
		<div
			id='item-modal'
			className='modal modal-fixed-footer'
			style={{ maxHeight: '100%', overflow: 'hidden' }}
		>
			<div className='container'>
				<div className='modal-content'>
					<h4>Agregar/Editar {name}</h4>
					<br />
					<div className='row'>
						<div className='col s6'>
							<div className='input-field'>
								<input
									type='text'
									name='name'
									value={name}
									onChange={onChange}
								/>
								{name === '' && (
									<label htmlFor='name' className='active'>
										Nombre
									</label>
								)}
							</div>
						</div>
					</div>
					<label>Etiquetas</label>
					<br />
					<br />
					<div className='row'>
						<TagSelectOptions
							onCheck={e => {
								const newTags = [...tags];
								if (e.target.checked)
									newTags.push(e.target.name);
								else
									newTags.splice(
										tags.indexOf(e.target.name),
										1
									);
								setItem({ ...item, tags: newTags });
							}}
							checked={tags}
						/>
					</div>
					<div className='row'>
						<div className='col s6'>
							<div className='input-field'>
								<label htmlFor='amount'>Cantidad</label>
								<input
									type='number'
									name='amount'
									value={amount}
									onChange={e =>
										e.target.value > 0 &&
										setItem({
											...item,
											amount: e.target.value
										})
									}
								/>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='input-field'>
							<span className='flow-text'>Imágen: </span>
							<br />
							<br />
							{image !== '' && (
								<Fragment>
									<img src={image} alt='' width='100px' />
									<br />
								</Fragment>
							)}
							{imgLoading && <Spinner />}
							<input
								type='file'
								onChange={e => {
									setImgLoading(true);
									uploadImage(e.target.files[0], false);
								}}
							/>
						</div>
					</div>
					<div className='row'>
						<div className='input-field'>
							<span>
								<strong>¿Dónde se guarda?:</strong>{' '}
							</span>
							<br />
							<br />
							{storedIn !== '' && (
								<Fragment>
									<img src={storedIn} alt='' width='100px' />
									<br />
								</Fragment>
							)}
							{storedInLoading && <Spinner />}
							<input
								type='file'
								onChange={e => {
									setStoredInLoading(true);
									uploadImage(e.target.files[0], true);
								}}
							/>
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
					Guardar
				</a>
			</div>
		</div>
	);
};

ItemModal.propTypes = {
	current: PropTypes.object,
	addItem: PropTypes.func.isRequired,
	updateItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	current: state.item.current
});

export default connect(
	mapStateToProps,
	{ addItem, updateItem }
)(ItemModal);
