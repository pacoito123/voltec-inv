const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');

const Tag = require('../models/Tag');

// @route GET api/tags
// @desc Get all tags
// @access Private
router.get('/', async (req, res) => {
	try {
		const tags = await Tag.find().sort({
			tag: -1
		});
		res.json(tags);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Error del servidor.');
	}
});

// @route POST api/tags
// @desc Add new tag
// @access Private
router.post(
	'/',
	[
		auth,
		[
			check('tag')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array });

		// Make sure user is admin.
		if (!req.user.admin)
			return res.status(401).json({ msg: 'Usuario no autorizado.' });

		const { tag } = req.body;

		try {
			const newTag = new Tag({
				tag
			});

			const tagObj = await newTag.save();

			res.json(tagObj);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Error del servidor.');
		}
	}
);

// @route PUT api/tags:id
// @desc Update tag
// @access Private
router.put('/:id', auth, async (req, res) => {
	const { tag } = req.body;

	// Build tag object
	const tagFields = {};
	if (tag) tagFields.tag = tag;

	try {
		let tag = Tag.findById(req.params.id);

		if (!tag)
			return res.status(404).json({ msg: 'Etiqueta no encontrada.' });

		// Make sure user is admin.
		if (!req.user.admin)
			return res.status(401).json({ msg: 'Usuario no autorizado.' });

		tag = await Tag.findByIdAndUpdate(
			req.params.id,
			{ $set: tagFields },
			{ new: true }
		);

		res.json(tag);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Error del servidor.');
	}
});

// @route DELETE api/tags/:id
// @desc Delete tag
// @access Private
router.delete('/:id', auth, async (req, res) => {
	try {
		let tag = await Tag.findById(req.params.id);

		if (!tag)
			return res.status(404).json({ msg: 'Etiqueta no encontrada.' });

		// Make sure user is admin.
		if (!req.user.admin)
			return res.status(401).json({ msg: 'Usuario no autorizado.' });

		await Tag.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Etiqueta eliminada.' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Error del servidor.');
	}
});

module.exports = router;
