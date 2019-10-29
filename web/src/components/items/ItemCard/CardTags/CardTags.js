import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const CardTags = ({ tags, hide }) => {
	return (
		<Fragment>
			{[...tags].reverse().map(tag => (
				<span
					key={tag}
					className={`new badge ${hide}`}
					data-badge-caption={`${tag}`}
				/>
			))}
		</Fragment>
	);
};

CardTags.propTypes = {
	tags: PropTypes.array.isRequired,
	hide: PropTypes.string.isRequired
};

export default CardTags;
