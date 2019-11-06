import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min';
import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GrabModal from './components/items/GrabModal/GrabModal';
import ItemModal from './components/items/ItemModal/ItemModal';
import StoredInModal from './components/items/StoredInModal/StoredInModal';
import AddBtn from './components/layout/AddBtn/AddBtn';
import NavBar from './components/layout/NavBar/NavBar';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import User from './components/pages/User/User';
import PrivateRoute from './components/routing/PrivateRoute/PrivateRoute';
import TagModal from './components/tags/TagModal/TagModal';
import store from './store';

const App = () => {
	useEffect(() => {
		M.AutoInit();
		// eslint-disable-next-line
	}, []);
	return (
		<Router>
			<Provider store={store}>
				<Fragment>
					<NavBar />
					<div className='container'>
						<Switch>
							<PrivateRoute exact path='/' component={Home} />
							<Route exact path='/login' component={Login} />
							<Route
								exact
								path='/register'
								component={Register}
							/>
							<PrivateRoute exact path='/user' component={User} />
						</Switch>
					</div>
					<AddBtn />
					<GrabModal />
					<ItemModal />
					<StoredInModal />
					<TagModal />
				</Fragment>
			</Provider>
		</Router>
	);
};

export default App;
