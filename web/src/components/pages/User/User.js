import 'moment/locale/es';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { loadUser } from '../../../actions/authActions';
import { getItems, updateItem } from '../../../actions/itemActions';
import VoltecLogo from '../../../assets/Logo.png';
import Logo from '../../layout/Logo/Logo';

const User = ({ items, user, getItems, updateItem, loadUser }) => {
	useEffect(() => {
		handleRefresh();
		// eslint-disable-next-line
	}, []);

	const onReturn = (i, { amount, date }) => {
		const newItem = {
			...i,
			grabbedBy: [...i.grabbedBy].filter(grab => grab.date !== date),
			amountGrabbed: i.amountGrabbed - amount
		};

		updateItem(newItem, true);
	};

	const handleRefresh = () => {
		loadUser();
		getItems();
	};

	return (
		<Fragment>
			<Logo
				width='30%'
				link='http://www.voltec6647.com/'
				image={VoltecLogo}
				refreshAction={() => handleRefresh()}
			/>
			<table className='responsive-table centered light-blue lighten-4 highlight '>
				<thead>
					<tr>
						<th>Usuario</th>
						<th>Nombre</th>
						<th>Objeto</th>
						<th>Cantidad</th>
						<th>Fecha</th>
						<th>-</th>
					</tr>
				</thead>
				<tbody>
					{// TODO: come up with a better way to do this, if it proves to be too slow.
					items !== null &&
						user !== null &&
						items.map(i =>
							i.grabbedBy.map(
								grab =>
									grab.user === user._id && (
										<tr key={grab.date}>
											<td>{user.name}</td>
											<td>{grab.name}</td>
											<td>{i.name}</td>
											<td>{grab.amount}</td>
											<td>
												<Moment
													locale='es'
													format='DD/MM/YYYY, h:mm:ss A'
												>
													{grab.date}
												</Moment>
											</td>
											<td>
												<a
													href='#!'
													onClick={() =>
														onReturn(i, grab)
													}
												>
													<i className='material-icons red-text text-darken-2'>
														delete
													</i>
												</a>
											</td>
										</tr>
									)
							)
						)}
				</tbody>
			</table>
		</Fragment>
	);
};

User.propTypes = {
	items: PropTypes.array,
	user: PropTypes.object,
	getItems: PropTypes.func.isRequired,
	updateItem: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	items: state.item.items,
	user: state.auth.user
});

export default connect(mapStateToProps, { getItems, updateItem, loadUser })(
	User
);
