const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/User');

// @route POST api/users
// @desc Registers a user
// @access Public
router.post(
	'/',
	[
		check('name', 'Por favor introduzca su nombre.')
			.not()
			.isEmpty(),
		check('email', 'Por favor introduzca un correo válido.').isEmail(),
		check(
			'password',
			'Por favor introduzca una contraseña con 6 o más caracteres.'
		).isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user)
				return res
					.status(400)
					.json({ msg: 'Un usuario con ese correo ya existe.' });

			const salt = await bcrypt.genSalt(15);
			let saltedPassword = await bcrypt.hash(password, salt);

			user = new User({
				name,
				email,
				password: saltedPassword
			});

			await user.save();

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
