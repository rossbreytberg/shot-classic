var http = require('http'),
	express = require('express'),
	app = express(),
	server = http.createServer(app),
	io = require('socket.io').listen(server),
	highscores = {};


app.set('view engine', 'ejs');
app.set('view options', {layout: false});
io.set('log level', 1);
app.set('views', __dirname + "/views");
app.use(express.bodyParser());
app.use("/static", express.static(__dirname + "/static"));
server.listen(8080);


app.get('/', function(req, res) {
	res.render('index');
});


app.get('/highscores', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(highscores));
});

io.sockets.on('connection', function(socket) {
	socket.on('submitscore', function(data) {
        if (!(data.score in highscores)) {
            highscores[data.score] = [];
        }
		highscores[data.score].push(data.name);
	});
});
