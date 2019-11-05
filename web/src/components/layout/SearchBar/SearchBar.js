import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { clearFilter, filterItems } from '../../../actions/itemActions';

const SearchBar = ({ filterItems, clearFilter, filtered }) => {
	const text = useRef('');

	useEffect(() => {
		if (filtered === null) text.current.value = '';
	});

	const onChange = e => {
		if (text.current.value !== '') filterItems(e.target.value);
		else clearField();
	};

	const clearField = () => {
		text.current.value = '';
		clearFilter();
	};

	return (
		<nav>
			<div className='nav-wrapper blue'>
				<form>
					<div className='input-field'>
						<input
							ref={text}
							id='search'
							type='search'
							onChange={onChange}
						/>
						<label className='label-icon' htmlFor='search'>
							<i className='material-icons'>search</i>
						</label>
						<i className='material-icons' onClick={clearField}>
							close
						</i>
					</div>
				</form>
			</div>
		</nav>
	);
};

SearchBar.propTypes = {
	filterItems: PropTypes.func.isRequired,
	clearFilter: PropTypes.func.isRequired,
	filtered: PropTypes.array
};

const mapStateToProps = state => ({
	filtered: state.item.filtered
});

export default connect(
	mapStateToProps,
	{ filterItems, clearFilter }
)(SearchBar);
