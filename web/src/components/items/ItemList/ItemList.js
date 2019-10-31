import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getItems } from '../../../actions/itemActions';
import Preloader from '../../layout/Preloader/Preloader';
import ItemCard from '../ItemCard/ItemCard';

const ItemList = ({ item: { items, loading }, getItems }) => {
	useEffect(() => {
		getItems();
		//eslint-disable-next-line
	}, []);

	if (loading || items === null) return <Preloader />;

	return (
		<div className='row'>
			{!loading && items.length === 0 ? (
				<p className='center white-text'>
					No se encontraron objetos...
				</p>
			) : (
				items.map(i => <ItemCard item={i} key={i.id} />)
			)}
		</div>
	);
};

ItemList.propTypes = {
	item: PropTypes.object.isRequired,
	getItems: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	item: state.item
});

export default connect(
	mapStateToProps,
	{ getItems }
)(ItemList);
