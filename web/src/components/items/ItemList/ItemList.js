import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getItems } from '../../../actions/itemActions';
import Preloader from '../../layout/Preloader/Preloader';
import ItemCard from '../ItemCard/ItemCard';

const ItemList = ({ item: { items, loading }, filtered, getItems }) => {
	useEffect(() => {
		getItems();
		//eslint-disable-next-line
	}, []);

	if (items !== null && items.length === 0 && !loading)
		return (
			<p className='center white-text'>No se encontraron objetos...</p>
		);

	return (
		<div className='row'>
			{items !== null && !loading ? (
				filtered !== null ? (
					filtered.map(i => <ItemCard item={i} key={i._id} />)
				) : (
					items.map(i => <ItemCard item={i} key={i._id} />)
				)
			) : (
				<Preloader />
			)}
		</div>
	);
};

ItemList.propTypes = {
	item: PropTypes.object.isRequired,
	filtered: PropTypes.array,
	getItems: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
	filtered: state.item.filtered
});

export default connect(
	mapStateToProps,
	{ getItems }
)(ItemList);
