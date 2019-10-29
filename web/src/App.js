import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min';
import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar/NavBar';
import Home from './components/pages/Home/Home';
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
							<Route exact path='/' component={Home} />
						</Switch>
					</div>
				</Fragment>
			</Provider>
		</Router>
	);
};

export default App;
