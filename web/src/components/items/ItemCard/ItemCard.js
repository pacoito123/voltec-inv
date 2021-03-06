import PropTypes from 'prop-types';
import React from 'react';
import CardBack from './CardBack/CardBack';
import CardTop from './CardTop/CardTop';
import GrabBtn from './GrabBtn/GrabBtn';

const ItemCard = ({ item }) => {
	return (
		<div className='col s12 m6 l4 xl3'>
			<div className='card z-depth-1 light-blue darken-3 hoverable'>
				<div className='card-image waves-effect waves-block waves-light'>
					<CardTop item={item} />
				</div>
				<div className='card-action'>
					<GrabBtn item={item} />
				</div>
				<div className='card-reveal light-blue lighten-3'>
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
