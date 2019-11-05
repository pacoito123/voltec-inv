import PropTypes from 'prop-types';
import React from 'react';

const Logo = ({ width, link, image }) => (
	<h1 className='center'>
		<a href={link}>
			<img
				src={image}
				alt=''
				className='responsive-img'
				style={{ width: `${width}` }}
			/>
		</a>
	</h1>
);

Logo.propTypes = {
	width: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired
};

export default Logo;
