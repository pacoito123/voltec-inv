import React from 'react';

const AddBtn = () => {
	return (
		<div className='fixed-action-btn'>
			<a
				className='btn-floating btn-large red modal-trigger'
				href='#add-item'
			>
				<i className='large material-icons'>add</i>
			</a>
			<ul>
				<li>
					<a
						href='#add-tag'
						className='btn-floating green modal-trigger'
					>
						<i className='material-icons'>backspace</i>
					</a>
				</li>
			</ul>
		</div>
	);
};

export default AddBtn;
