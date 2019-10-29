import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import CardTags from '../CardTags/CardTags';

const CardTop = ({ item: { name, tags, image } }) => {
	return (
		<Fragment>
			<img
				src={image}
				alt=''
				className='activator responsive-img'
			/>
			<span
				className='card-title light-blue-text'
				style={{ textShadow: '1px 1px #0d47a1' }}
			>
				<strong className='activator'>{name}</strong>
				<CardTags tags={tags} hide='hide-on-med-and-down' />
			</span>
		</Fragment>
	);
};

CardTop.propTypes = {
	item: PropTypes.object.isRequired
};

export default CardTop;
