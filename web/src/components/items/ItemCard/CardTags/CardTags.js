import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { clearFilter, filterItems } from '../../../../actions/itemActions';

const CardTags = ({ tags, hide, filtered, filterItems, clearFilter }) => {
	return (
		<Fragment>
			{[...tags].reverse().map(tag => (
				<span
					key={tag}
					className={`new badge ${hide}`}
					data-badge-caption={`${tag}`}
					onClick={() => {
						if (filtered) clearFilter();
						filterItems(tag);
					}}
				/>
			))}
		</Fragment>
	);
};

CardTags.propTypes = {
	tags: PropTypes.array.isRequired,
	hide: PropTypes.string.isRequired,
	filtered: PropTypes.array,
	filterItems: PropTypes.func.isRequired,
	clearFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	filtered: state.item.filtered
});

export default connect(
	mapStateToProps,
	{ filterItems, clearFilter }
)(CardTags);
