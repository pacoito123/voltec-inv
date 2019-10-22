import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CardTags from '../CardTags/CardTags';
import { connect } from 'react-redux';
import { setCurrent } from '../../../../actions/itemActions';
import Moment from 'react-moment';
import 'moment/locale/es';

const CardBack = ({ item, setCurrent }) => {
	const { name, tags, amountGrabbed, grabbedBy } = item;
	return (
		<Fragment>
			<span className='card-title grey-text text-darken-4'>
				<i className='material-icons right'>close</i>
				<strong>{name}</strong>
				<CardTags tags={tags} hide='hide-on-large-only' />
				<hr />
			</span>
			{amountGrabbed > 0 && (
				<Fragment>
					<table className='responsive-table centered light-blue accent-1'>
						<thead>
							<tr>
								<th>Usuario</th>
								<th>Cantidad</th>
								<th>Fecha</th>
							</tr>
						</thead>
						<tbody>
							{grabbedBy.map(grab => (
								<tr key={grab}>
									<td>{grab.user}</td>
									<td>{grab.amount}</td>
									<td>
										<Moment
											locale='es'
											format='DD/MM/YYYY, h:mm:ss A'
										>
											{grab.date}
										</Moment>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<hr />
				</Fragment>
			)}
			<div className='center'>
				<a
					className='waves-effect waves-light btn-small modal-trigger'
					href='#stored-in'
					onClick={() => setCurrent(item)}
				>
					¿Dónde se guarda?
				</a>
			</div>
		</Fragment>
	);
};

CardBack.propTypes = {
	item: PropTypes.object.isRequired,
	setCurrent: PropTypes.func.isRequired
};

export default connect(
	null,
	{ setCurrent }
)(CardBack);
