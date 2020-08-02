const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('Connected to Database');
});

const blogSchema = mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: { type: Date, default: Date.now() }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
