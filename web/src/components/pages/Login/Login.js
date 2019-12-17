import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { clearErrors, loginUser } from '../../../actions/authActions';
import VoltecLogo from '../../../assets/Logo.png';
import Logo from '../../layout/Logo/Logo';
import Spinner from '../../layout/Spinner/Spinner';

const Login = ({ history, error, isAuthenticated, loginUser, clearErrors }) => {
	useEffect(() => {
		handleRefresh();

		if (error) {
			if (error.errors)
				error.errors.map(err => M.toast({ html: `${err.msg}` }));
			if (error.msg) M.toast({ html: `${error.msg}` });
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, history]);

	const email = useRef('');
	const password = useRef('');

	const [loading, setLoading] = useState(false);

	const onSubmit = e => {
		e.preventDefault();

		if (email.current.value !== '' && password.current.value !== '') {
			loginUser({
				email: email.current.value,
				password: password.current.value
			});
			setLoading(true);
		} else M.toast({ html: 'Faltó por ingresar algún parámetro.' });
	};

	const handleRefresh = () => {
		if (isAuthenticated || localStorage.getItem('token')) {
			setLoading(false);
			history.push('/');
		}
	}

	return (
		<Fragment>
			<Logo
				width='30%'
				link='http://www.voltec6647.com/'
				image={VoltecLogo}
				refreshAction={() => handleRefresh()}
			/>
			<div className='container light-blue lighten-5 hoverable'>
				<div className='row cyan darken-2'>
					<h4
						className='white-text center'
						style={{ paddingTop: '10px' }}
					>
						Iniciar sesión
					</h4>
				</div>
				<form>
					<div className='row'>
						<div className='container'>
							<div className='input-field col s12'>
								<i className='material-icons prefix'>email</i>
								<input
									ref={email}
									id='email'
									type='email'
									placeholder='Correo electrónico'
									className='validate'
								/>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='container'>
							<div className='input-field col s12'>
								<i className='material-icons prefix'>vpn_key</i>
								<input
									ref={password}
									id='password'
									type='password'
									placeholder='Contraseña'
									className='validate'
								/>
							</div>
						</div>
					</div>
					{loading && (
						<div className='center'>
							<Spinner />
						</div>
					)}
					<div className='row center'>
						<button
							type='submit'
							className='waves-effect waves-light btn cyan darken-2'
							onClick={onSubmit}
						>
							Entrar
							<i className='material-icons right'>send</i>
						</button>
					</div>
				</form>
				<div className='row center'>
					<a
						className='waves-effect waves-light btn teal darken-2'
						href='/register'
					>
						¿Necesitas una cuenta?
					</a>
				</div>
				<br />
			</div>
		</Fragment>
	);
};

Login.propTypes = {
	history: PropTypes.object.isRequired,
	error: PropTypes.object,
	isAuthenticated: PropTypes.bool,
	loginUser: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	error: state.auth.error,
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginUser, clearErrors })(Login);
