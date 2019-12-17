const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');

const Item = require('../models/Item');

// @route GET api/items
// @desc Get all items
// @access Public
router.get('/', async (req, res) => {
	try {
		const items = await Item.find();

		res.json(items);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Error del servidor.');
	}
});

// @route POST api/items
// @desc Add new item
// @access Private
router.post(
	'/',
	[
		auth,
		[
			check('name', 'Por favor introduzca el nombre del objeto.')
				.not()
				.isEmpty(),
			check('amount', 'Por favor introduzca la cantidad del objeto.')
				.not()
				.isEmpty(),
			check('tags', 'Las etiquetas del objeto no son válidas.').isArray(),
			check('image', 'Por favor seleccione la imágen del objeto.')
				.not()
				.isEmpty(),
			check(
				'storedIn',
				'Por favor seleccione la imágen de dónde se guarda el objeto.'
			)
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		// Make sure user is admin.
		if (!req.user.admin)
			return res.status(401).json({ msg: 'Usuario no autorizado.' });

		const { name, amount, tags, image, storedIn } = req.body;

		try {
			const newItem = new Item({
				name,
				amount,
				tags,
				image,
				storedIn
			});

			const item = await newItem.save();

			res.json(item);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Error del servidor.');
		}
	}
);

// @route PUT api/items:id
// @desc Update item
// @access Private
router.put('/:id', auth, async (req, res) => {
	const {
		name,
		amount,
		tags,
		image,
		storedIn,
		grabbedBy,
		amountGrabbed,
		timesGrabbed
	} = req.body[0];

	// Build item object
	const itemFields = {
		name,
		amount,
		tags,
		image,
		storedIn,
		grabbedBy,
		amountGrabbed,
		timesGrabbed
	};

	try {
		let item = await Item.findById(req.params.id);

		if (!item)
			return res.status(500).json({ msg: 'Objeto no encontrado.' });

		// Make sure user is admin.
		if (!req.user.admin && !req.body[1])
			return res.status(401).json({ msg: 'Usuario no autorizado.' });

		item = await Item.findByIdAndUpdate(
			req.params.id,
			{ $set: itemFields },
			{ new: true }
		);

		res.json(item);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Error del servidor.');
	}
});

// @route DELETE api/items:id
// @desc Delete item
// @access Private
router.delete('/:id', auth, async (req, res) => {
	try {
		let item = await Item.findById(req.params.id);

		if (!item)
			return res.status(404).json({ msg: 'Objeto no encontrado.' });

		// Make sure user is admin.
		if (!req.user.admin)
			return res.status(401).json({ msg: 'Usuario no autorizado.' });

		await Item.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Objeto eliminado.' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Error del servidor.');
	}
});

module.exports = router;
