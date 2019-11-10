const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');

	// Check if not token
	if (!token) return res.status(401).json({ msg: 'No autorizado.' });

	try {
		const decoded = jwt.verify(
			token,
			process.env.NODE_ENV === 'production'
				? process.env.JWT_SECRET
				: config.get('jwtSecret')
		);

		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({
			msg: 'No autorizado.'
		});
	}
};
