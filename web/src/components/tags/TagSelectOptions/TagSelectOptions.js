import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const TagSelectOptions = ({ tag: { tags, loading }, onCheck, checked }) => {
	return (
		!loading &&
		tags != null &&
		tags.map(t => (
			<div className='col s6' key={t.id}>
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
