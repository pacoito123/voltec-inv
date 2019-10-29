import React, { Fragment } from 'react';

const Spinner = () => {
	return (
		<Fragment>
			<div className='preloader-wrapper big active'>
				<div className='spinner-layer spinner-blue-only'>
					<div className='circle-clipper left'>
						<div className='circle'></div>
					</div>
					<div className='gap-patch'>
						<div className='circle'></div>
					</div>
					<div className='circle-clipper right'>
						<div className='circle'></div>
					</div>
				</div>
			</div>
			<br />
			<br />
		</Fragment>
	);
};

export default Spinner;
