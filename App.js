const express = require('express');
const bodyParser = require('body-parser');
const Blog = require('./db');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
app = express();

app.set('view engine', 'ejs');
app.use('/static', express.static('./static/')); //for using external JS file in HTML
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(methodOverride('_method'));

app.get('/', function (req, res) {
	res.redirect('/blogs');
});

app.get('/blogs', function (req, res) {
	Blog.find({}, function (err, blogs) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', { blogs: blogs });
		}
	});
});

app.get('/blogs/new', function (req, res) {
	res.render('new');
});

app.put('/blogs/:id', function (req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

app.delete('/blogs/:id', function (req, res) {
	Blog.findByIdAndDelete(req.params.id, function (err, updatedBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs');
		}
	});
});

app.get('/blogs/:id/edit', function (req, res) {
	Blog.findById(req.params.id, function (err, foundBlog) {
		if (err) {
			res.redirect('/');
		} else {
			res.render('edit', { blog: foundBlog });
		}
	});
});

app.get('/blogs/:id', function (req, res) {
	Blog.findById(req.params.id, function (err, foundBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.render('show', { blog: foundBlog });
		}
	});
});

app.post('/blogs', function (req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function (err, newBlog) {
		if (err) {
			res.render('new');
		} else {
			res.redirect('/blogs');
		}
	});
});

app.listen(3000, function () {
	console.log('Connected to Server!');
});
