import 'moment/locale/es';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Moment from 'react-moment';

const CardTable = ({ grabbedBy }) => {
	return (
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
	);
};

CardTable.propTypes = {
	grabbedBy: PropTypes.array.isRequired
};

export default CardTable;
