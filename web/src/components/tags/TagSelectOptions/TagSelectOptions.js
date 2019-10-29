import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTags } from '../../../actions/tagActions';

const TagSelectOptions = ({ getTags, tag: { tags, loading }, onCheck }) => {
	useEffect(() => {
		getTags();
		// eslint-disable-next-line
	}, []);

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
						defaultChecked={tags.includes(t.tag)}
						id='tags'
					/>
					<span className='flow-text'>{t.tag}</span>
				</label>
			</div>
		))
	);
};

TagSelectOptions.propTypes = {
	tags: PropTypes.object,
	getTags: PropTypes.func.isRequired,
	onCheck: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tag: state.tag
});

export default connect(
	mapStateToProps,
	{ getTags }
)(TagSelectOptions);
