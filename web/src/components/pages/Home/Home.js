import React, { Fragment } from 'react';
import GrabModal from '../../items/GrabModal/GrabModal';
import ItemList from '../../items/ItemList/ItemList';
import ItemModal from '../../items/ItemModal/ItemModal';
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
			<ItemModal />
			<StoredInModal />
			<GrabModal />
		</Fragment>
	);
};

export default Home;
