import React from 'react';
import GrabBtn from './GrabBtn/GrabBtn';
import CardBack from './CardBack/CardBack';
import CardTop from './CardTop/CardTop';
import PropTypes from 'prop-types';

const ItemCard = ({ item }) => {
	return (
		<div className='col s12 m6 l4'>
			<div className='card z-depth-1 light-blue darken-3 hoverable'>
				<div className='card-image waves-effect waves-block waves-light'>
					<CardTop item={item} />
				</div>
				<div className='card-action'>
					<GrabBtn item={item} />
				</div>
				<div className='card-reveal light-blue accent-2'>
					<CardBack item={item} />
				</div>
			</div>
		</div>
	);
};

ItemCard.propTypes = {
	item: PropTypes.object.isRequired
};

export default ItemCard;
