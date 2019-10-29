import Axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../../actions/itemActions';
import Spinner from '../../layout/Spinner/Spinner';
import TagSelectOptions from '../../tags/TagSelectOptions/TagSelectOptions';

const AddItemModal = ({ addItem }) => {
	const [name, setName] = useState('');
	const [tags, setTags] = useState([]);
	const [amount, setAmount] = useState(1);
	const [image, setImage] = useState('');
	const [imgLoading, setImgLoading] = useState(false);
	const [storedIn, setStoredIn] = useState('');
	const [storedInLoading, setStoredInLoading] = useState(false);

	const onSubmit = () => {
		if (name === '' || tags.length === 0 || image === '' || storedIn === '')
			M.toast({ html: 'Faltó por ingresar algunos parámetros.' });
		else {
			const newItem = {
				name,
				tags,
				amount,
				image,
				storedIn,
				amountGrabbed: 0,
				grabbedBy: [],
				timesGrabbed: 0
			};

			addItem(newItem);

			M.toast({ html: `Se ha agregado ${name} al inventario!` });

			// Clear fields
			setName('');
			setAmount(1);
			setImage('');
			setStoredIn('');
		}
	};

	const uploadImage = async (img, storedIn) => {
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

			if (!storedIn) {
				setImage(res.data.data.link);
				setImgLoading(false);
			} else {
				setStoredIn(res.data.data.link);
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
		<div id='add-item' className='modal'>
			<div className='container'>
				<div className='modal-content'>
					<h4>Agregar objeto</h4>
					<div className='row'>
						<div className='input-field'>
							<input
								type='text'
								name='name'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
							<label htmlFor='name' className='active'>
								Nombre
							</label>
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
								setTags(newTags);
							}}
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
										e.target.value >= 0 &&
										setAmount(e.target.value)
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
					{
						<div className='row'>
							<div className='input-field'>
								<span>
									<strong>¿Dónde se guarda?:</strong>{' '}
								</span>
								<br />
								<br />
								{storedIn !== '' && (
									<Fragment>
										<img
											src={storedIn}
											alt=''
											width='100px'
										/>
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
					}
				</div>
			</div>
			<div className='container'>
				<div className='modal-footer'>
					<a
						href='#!'
						onClick={onSubmit}
						className='modal-close waves-effect blue waves-light btn'
					>
						Agregar
					</a>
				</div>
			</div>
		</div>
	);
};

AddItemModal.propTypes = {
	addItem: PropTypes.func.isRequired
};

export default connect(
	null,
	{ addItem }
)(AddItemModal);
