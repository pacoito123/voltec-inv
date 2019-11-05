import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Preloader from '../../layout/Preloader/Preloader';

const TagSelectOptions = ({ tag: { tags, loading }, onCheck, checked }) => {
	return !loading && tags != null ? (
		tags.length > 0 ? (
			tags.map(t => (
				<div className='col s6 m4' key={t._id}>
					<label>
						<input
							type='checkbox'
							className='filled-in'
							name={t.tag}
							onChange={onCheck}
							checked={
								checked !== null &&
								checked !== undefined &&
								checked.includes(t.tag)
							}
							id='tags'
						/>
						<span className='flow-text'>{t.tag}</span>
					</label>
				</div>
			))
		) : (
			<div className='center'>
				<span>
					No se encontraron etiquetas...
				</span>
			</div>
		)
	) : (
		<Preloader />
	);
};

TagSelectOptions.propTypes = {
	tag: PropTypes.object,
	onCheck: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tag: state.tag
});

export default connect(mapStateToProps)(TagSelectOptions);
