import React from 'react';

const NavBar = () => {
	return (
		<div className='fixed-navbar'>
			<nav>
				<div className='nav-wrapper blue darken-1'>
					<a href='#!' className='brand-logo center'>
						voltec-inv
					</a>
					<ul className='right '>
						<li>
							<a href='#!'>
								<i className='material-icons'>account_circle</i>
							</a>
						</li>
						<li>
							<a href='#!'>
								<i className='material-icons'>more_vert</i>
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
