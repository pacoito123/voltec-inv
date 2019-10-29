import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { setCurrent, removeItem } from '../../../../actions/itemActions';
import CardTags from '../CardTags/CardTags';
import CardTable from './CardTable/CardTable';

const CardBack = ({ item, setCurrent, removeItem }) => {
	const { name, tags, amountGrabbed, grabbedBy } = item;

	const onDelete = () => {
		removeItem(item.id);
		M.toast({ html: 'Objeto eliminado.' });
	};

	return (
		<Fragment>
			<span className='card-title grey-text text-darken-4'>
				<i className='material-icons right'>close</i>
				<strong>{name}</strong>
				<CardTags tags={tags} hide='hide-on-large-only' />
				<hr />
			</span>
			{amountGrabbed > 0 && <CardTable grabbedBy={grabbedBy} />}
			<a
				className='waves-effect waves-light btn blue darken-2 modal-trigger col s12'
				href='#stored-in'
				onClick={() => setCurrent(item)}
			>
				¿Dónde se guarda?
				<i className='material-icons right'>archive</i>
			</a>
			<br />
			<br />
			<a
				className='waves-effect waves-light btn green darken-2 modal-trigger col s12'
				href='#edit-item'
				onClick={null}
			>
				Editar
				<i className='material-icons right'>edit</i>
			</a>
			<br />
			<br />
			<a
				className='waves-effect waves-light btn red darken-4 col s12'
				href='#!'
				onClick={onDelete}
			>
				Eliminar
				<i className='material-icons right'>delete_forever</i>
			</a>
		</Fragment>
	);
};

CardBack.propTypes = {
	item: PropTypes.object.isRequired,
	setCurrent: PropTypes.func.isRequired,
	removeItem: PropTypes.func.isRequired
};

export default connect(
	null,
	{ setCurrent, removeItem }
)(CardBack);
