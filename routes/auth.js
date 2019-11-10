const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route GET api/auth
// @desc Gets logged in user
// @access Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Error del servidor.' });
	}
});

// @route POST api/auth
// @desc Auth user and get token
// @access Public
router.post(
	'/',
	[
		check('email', 'Por favor introduzca un correo válido.').isEmail(),
		check('password', 'Por favor introduzca su contraseña.').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user)
				return res.status(400).json({
					msg:
						'El correo introducido no se encuentra registrado en la base de datos.'
				});

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch)
				return res
					.status(400)
					.json({ msg: 'La contraseña es incorrecta.' });

			const payload = {
				user: {
					_id: user._id,
					admin: user.admin,
					name: user.name,
					email: user.email
				}
			};

			jwt.sign(
				payload,
				process.env.NODE_ENV === 'production'
					? process.env.JWT_SECRET
					: config.get('jwtSecret'),
				{
					expiresIn: 36000
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Error del servidor.');
		}
	}
);

module.exports = router;
