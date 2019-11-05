const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect to DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/tags', require('./routes/tags'));

// Server static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('web/build'));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'web', 'build', 'index.html'))
	);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
