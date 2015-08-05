var argv = require('minimist')(process.argv.slice(2));
var dateFormat = require('dateformat');
var fs = require('fs');

var path = argv['p'];
if (path === undefined) {
	path = './';
}

var Post = function (title, category) {
    this._title = title;
	this._category = category;
	this._author = 'Robert Greiner';
	this._about = '<a href=\"http://robertgreiner.com/about\" rel=\"author\">';
};

Post.prototype.content = function () {
	return '---\n' + 
		'layout: post\n' + 
		'title: ' + this._title + '\n' + 
		'categories: [' + this._category + ']\n' + 
		'author: ' + this._about + this._author + '</a>\n' +
		'---\n\n';
};

Post.prototype.filename = function () {
	var now = new Date();
	var name = '/' + dateFormat(now, "yyyy-mm-dd-") + this._title + '.md';
	return name.toLowerCase().replace(/ /g, '-');
};


var post = new Post(argv['t'], argv['c']);
console.log('writing file to: ' + path + post.filename());

fs.writeFile(path + post.filename(), post.content(), function(e) {
    if (e) {
        return console.log(e);
    }
}); 