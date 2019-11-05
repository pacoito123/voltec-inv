import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTags } from '../../../actions/tagActions';
import Preloader from '../../layout/Preloader/Preloader';
import TagItem from '../TagItem/TagItem';

const TagList = ({ tag: { tags, loading }, getTags }) => {
	useEffect(() => {
		getTags();
		// eslint-disable-next-line
	}, []);

	return !loading && tags != null ? (
		tags.length > 0 ? (
			tags.map(t => <TagItem tag={t} key={t._id} />)
		) : (
			<div className='light-blue lighten-5 center'>
				<span className='flow-text'>
					No se encontraron etiquetas...
				</span>
			</div>
		)
	) : (
		<Preloader />
	);
};

TagList.propTypes = {
	tag: PropTypes.object,
	getTags: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tag: state.tag
});

export default connect(
	mapStateToProps,
	{ getTags }
)(TagList);
