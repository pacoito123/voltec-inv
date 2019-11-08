import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { clearErrors, registerUser } from '../../../actions/authActions';
import VoltecLogo from '../../../assets/Logo.png';
import Logo from '../../layout/Logo/Logo';

const Register = ({
	history,
	error,
	isAuthenticated,
	registerUser,
	clearErrors
}) => {
	useEffect(() => {
		if (isAuthenticated || localStorage.getItem('token')) history.push('/');

		if (error) {
			if (error.errors)
				error.errors.map(err => M.toast({ html: `${err.msg}` }));
			if (error.msg) M.toast({ html: `${error.msg}` });
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, history]);

	const name = useRef('');
	const email = useRef('');
	const password = useRef('');
	const passwordVerify = useRef('');

	const onSubmit = e => {
		e.preventDefault();

		if (
			name.current.value !== '' &&
			email.current.value !== '' &&
			password.current.value !== '' &&
			passwordVerify.current.value !== ''
		) {
			if (password.current.value === passwordVerify.current.value) {
				registerUser({
					name: name.current.value,
					email: email.current.value,
					password: password.current.value
				});
			} else M.toast({ html: 'Las contraseñas no son iguales.' });
		} else M.toast({ html: 'Por favor llene todo el formulario.' });
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
						Registrar una cuenta
					</h4>
				</div>
				<form>
					<div className='row'>
						<div className='container'>
							<div className='input-field col s12'>
								<i className='material-icons prefix'>
									account_circle
								</i>
								<input
									ref={name}
									id='name'
									type='text'
									placeholder='Nombre'
								/>
							</div>
						</div>
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
					<div className='row'>
						<div className='container'>
							<div className='input-field col s12'>
								<i className='material-icons prefix'>vpn_key</i>
								<input
									ref={passwordVerify}
									id='passwordVerify'
									type='password'
									placeholder='Verificar Contraseña'
									className='validate'
								/>
							</div>
						</div>
					</div>
					<div className='row center'>
						<button
							type='submit'
							className='waves-effect waves-light btn cyan darken-2'
							onClick={onSubmit}
						>
							Registrarse
							<i className='material-icons right'>send</i>
						</button>
					</div>
				</form>
				<div className='row center'>
					<a
						className='waves-effect waves-light btn teal darken-2'
						href='/login'
					>
						¿Ya tienes cuenta?
					</a>
				</div>
				<br />
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</Fragment>
	);
};

Register.propTypes = {
	history: PropTypes.object.isRequired,
	error: PropTypes.object,
	isAuthenticated: PropTypes.bool,
	registerUser: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	error: state.auth.error,
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(
	mapStateToProps,
	{ registerUser, clearErrors }
)(Register);
