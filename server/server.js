const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose.connect(
	process.env.DB_URI,
	{
		maxPoolSize: 50,
		wtimeoutMS: 2500,
		useNewURLParser: true
	}
)
.catch(err => {
	console.error(err.stack);
	process.exit(1);
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB database connection established successfully.");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});