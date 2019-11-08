import Axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addItem, clearCurrent, updateItem } from '../../../actions/itemActions';
import Spinner from '../../layout/Spinner/Spinner';
import Ticker from '../../layout/Ticker/Ticker';
import TagSelectOptions from '../../tags/TagSelectOptions/TagSelectOptions';

const ItemModal = ({ current, addItem, updateItem, clearCurrent }) => {
	useEffect(() => {
		if (current !== null) setItem(current);
		else clearFields();
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

	const { name, tags, amount, image, storedIn, amountGrabbed } = item;

	const [imgLoading, setImgLoading] = useState(false);
	const [storedInLoading, setStoredInLoading] = useState(false);

	const onSubmit = e => {
		e.preventDefault();

		if (name === '' || image === '' || storedIn === '')
			M.toast({ html: 'Faltó por ingresar algunos parámetros...' });
		else {
			if (current === null) addItem(item);
			else updateItem(item, false);

			clearFields();
		}
	};

	const updateAmount = amountAdded => {
		setItem({
			...item,
			amount:
				amount + amountAdded >= amountGrabbed &&
				amount + amountAdded > 0
					? amount + amountAdded
					: amount
		});
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
		clearCurrent();
	};

	const uploadImage = async (img, storedInCheck) => {
		let imageFormObj = new FormData();

		imageFormObj.append('imageName', 'image-' + Date.now());
		imageFormObj.append('imageData', img);

		try {
			const res = await Axios.post('/api/img', imageFormObj);

			if (!storedInCheck) {
				setItem({ ...item, image: res.data.link });
				setImgLoading(false);
			} else {
				setItem({ ...item, storedIn: res.data.link });
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
			className='modal modal-fixed-footer light-blue lighten-4'
			style={{ overflow: 'hidden' }}
		>
			<div
				className='modal-header cyan darken-1 center'
				style={{ padding: '20px 0px 10px 0px' }}
			>
				<h4>Agregar/Editar {name}</h4>
			</div>
			<div className='modal-content'>
				<div className='container'>
					<div className='row'>
						<div className='input-field col s12'>
							<i className='material-icons prefix'>build</i>
							<input
								type='text'
								id='itemName'
								name='itemName'
								value={name}
								onChange={e =>
									setItem({ ...item, name: e.target.value })
								}
								required
							/>
							{name === '' && (
								<label htmlFor='itemName' className='active'>
									Nombre
								</label>
							)}
						</div>
					</div>
					<Ticker
						amount={amount}
						onAmountChange={e =>
							e.target.value >= amountGrabbed &&
							e.target.value > 0 &&
							setItem({
								...item,
								amount: Number(e.target.value)
							})
						}
						onBtnClick={updateAmount}
					/>
					<label>Etiquetas</label>
					<br />
					<br />
					<div className='row'>
						<TagSelectOptions
							onCheck={e => {
								const newTags = tags.slice();
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
					<br />
					<div className='row'>
						{/\.(jpg|gif|png)$/.test(image) && (
							<Fragment>
								<img src={image} alt='' width='100px' />
								<br />
							</Fragment>
						)}
						{imgLoading && <Spinner />}
						<div className='file-field input-field col s7 m5'>
							<div className='btn cyan darken-1'>
								<span>Imágen</span>
								<i className='material-icons left'>
									attach_file
								</i>
								<input
									type='file'
									name='imgUpload'
									formEncType='multipart/form-data'
									onChange={e => {
										if (e.target.files[0] !== undefined) {
											setImgLoading(true);
											uploadImage(
												e.target.files[0],
												false
											);
										}
									}}
								/>
							</div>
							<div className='file-path-wrapper' hidden>
								<input
									type='text'
									className='file-path validate'
								/>
							</div>
						</div>
						<input
							type='text'
							id='image'
							name='image'
							value={image}
							onChange={e =>
								setItem({ ...item, image: e.target.value })
							}
							className='validate col s5 m7'
						/>
					</div>
					<div className='row'>
						{/\.(jpg|gif|png)$/.test(storedIn) && (
							<Fragment>
								<img src={storedIn} alt='' width='100px' />
								<br />
							</Fragment>
						)}
						{storedInLoading && <Spinner />}
						<div className='file-field input-field col s11 m7'>
							<div className='btn cyan darken-1'>
								<span>¿Dónde se guarda?</span>
								<i className='material-icons left'>
									attach_file
								</i>
								<input
									type='file'
									name='storedInUpload'
									formEncType='multipart/form-data'
									onChange={e => {
										if (e.target.files[0] !== undefined) {
											setStoredInLoading(true);
											uploadImage(
												e.target.files[0],
												true
											);
										}
									}}
								/>
							</div>
							<div className='file-path-wrapper' hidden>
								<input
									type='text'
									className='file-path validate'
								/>
							</div>
						</div>
						<input
							type='text'
							id='storedIn'
							name='storedIn'
							value={storedIn}
							onChange={e =>
								setItem({
									...item,
									storedIn: e.target.value
								})
							}
							className='validate col s1 m5'
						/>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
					</div>
				</div>
			</div>
			<div className='modal-footer cyan darken-1'>
				<a
					href='#!'
					onClick={onSubmit}
					className='modal-close waves-effect blue waves-light btn'
				>
					<i className='material-icons left'>save</i>
					Guardar
				</a>
			</div>
		</div>
	);
};

ItemModal.propTypes = {
	current: PropTypes.object,
	addItem: PropTypes.func.isRequired,
	updateItem: PropTypes.func.isRequired,
	clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	current: state.item.current
});

export default connect(
	mapStateToProps,
	{ addItem, updateItem, clearCurrent }
)(ItemModal);
