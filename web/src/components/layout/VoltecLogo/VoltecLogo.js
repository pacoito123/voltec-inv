import PropTypes from 'prop-types';
import React from 'react';
import Logo from '../../../assets/Logo.png';

const VoltecLogo = ({ width }) => {
	return (
		<h1 className='center'>
			<a href='http://www.voltec6647.com/'>
				<img
					src={Logo}
					alt=''
					className='responsive-img'
					style={{ width: `${width}` }}
				/>
			</a>
		</h1>
	);
};

VoltecLogo.propTypes = {
	width: PropTypes.string.isRequired
};

export default VoltecLogo;
