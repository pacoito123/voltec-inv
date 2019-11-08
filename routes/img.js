const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './images/');
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + '_' + file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
		cb(null, true);
	else cb(null, false);
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

// @route POST /api/img
// @desc Upload image
// @access Private (Admin)
router.post('/', upload.single('imageData'), (req, res) => {
	try {
		res.json({ link: req.file.path });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Error del servidor.');
	}
});

module.exports = router;
