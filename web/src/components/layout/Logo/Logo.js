import PropTypes from 'prop-types';
import React from 'react';
import ReactPullToRefresh from 'react-pull-to-refresh';

const Logo = ({ width, link, image, refreshAction }) => (
	<ReactPullToRefresh onRefresh={refreshAction}>
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
	</ReactPullToRefresh>
);

Logo.propTypes = {
	width: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired
};

export default Logo;
