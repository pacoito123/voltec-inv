import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { clearErrors, loginUser } from '../../../actions/authActions';
import VoltecLogo from '../../../assets/Logo.png';
import Logo from '../../layout/Logo/Logo';

const Login = ({ history, error, isAuthenticated, loginUser, clearErrors }) => {
	useEffect(() => {
		if (isAuthenticated) history.push('/');

		// TODO: add actual errors
		if (error) {
			M.toast({ html: `${error}` });
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, history]);

	const email = useRef('');
	const password = useRef('');

	const onSubmit = e => {
		e.preventDefault();

		if (email.current.value !== '' && password.current.value !== '') {
			loginUser({
				email: email.current.value,
				password: password.current.value
			});
		} else {
			M.toast({ html: 'Faltó por ingresar algún parámetro.' });
		}
	};

	return (
		<Fragment>
			<Logo
				width='30%'
				link='http://www.voltec6647.com/'
				image={VoltecLogo}
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
				<div className='row center'>
					<a
						className='waves-effect waves-light btn cyan darken-2'
						href='#!'
						onClick={onSubmit}
					>
						Entrar
						<i className='material-icons right'>send</i>
					</a>
				</div>
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
	error: PropTypes.string,
	isAuthenticated: PropTypes.bool,
	loginUser: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	error: state.auth.error,
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(
	mapStateToProps,
	{ loginUser, clearErrors }
)(Login);
