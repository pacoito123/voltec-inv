import React, { Fragment } from 'react';
import AddItemModal from '../../items/AddItemModal/AddItemModal';
import ItemList from '../../items/ItemList/ItemList';
import StoredInModal from '../../items/StoredInModal/StoredInModal';
import AddBtn from '../../layout/AddBtn/AddBtn';
import SearchBar from '../../layout/SearchBar/SearchBar';
import VoltecLogo from '../../layout/VoltecLogo/VoltecLogo';

const Home = () => {
	return (
		<Fragment>
			<VoltecLogo width='30%' />
			<div className='row'>
				<div className='col s12'>
					<SearchBar />
					<br />
					<ItemList />
				</div>
			</div>
			<AddBtn />
			<AddItemModal />
			<StoredInModal />
		</Fragment>
	);
};

export default Home;
